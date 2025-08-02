import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignupLayout from "@/pages/SignupLayout";
import ImageUploader from "@/components/group/ImageUploader";
import Input from "@/components/Input/input";
import Button from "@/components/button/button";
import usePenaltyStore from "@/stores/usePenaltyStore"; // 스토어 import

const PenaltyUpload = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  // state에서 groupId도 받아오도록 수정
  const { punishment: selectedPunishment, groupId } = state || {
    punishment: "벌칙이 선택되지 않았어요",
    groupId: null,
  };

  const { fetchPenalties } = usePenaltyStore(); // 스토어에서 데이터 갱신 함수 가져오기
  const [content, setContent] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = content.trim() === "" || !isImageUploaded;

  const handleUpload = async () => {
    if (!groupId) {
      alert("그룹 정보를 찾을 수 없습니다.");
      return;
    }

    const payload = {
      group_id: groupId,
      punish: selectedPunishment,
      content,
    };

    try {
      setLoading(true);
      const response = await fetch('http://localhost:8000/api/user/punishFeed', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
        credentials: 'include',
      });

      if (!response.ok) {
        throw new Error('벌칙 업로드 실패');
      }

      alert("업로드 완료!");
      await fetchPenalties(); // << 핵심: 업로드 후 상태 갱신
      navigate(-1); // 이전 페이지로 이동

    } catch (error) {
      console.error("벌칙 업로드 실패:", error);
      alert("업로드 중 오류가 발생했습니다.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupLayout
      headerProps={{
        type: "header-b",
        title: "ㅤ벌칙 업로드",
        icon1: "none",
      }}
    >
      <div className="penalty-info-box">
        <div className="penalty-info-row">
          <strong>벌칙 : </strong>
          <span>{selectedPunishment}</span>
        </div>
      </div>

      <div className="penalty-upload-wrapper">
        <div className="input-wrap">
          <ImageUploader onImageChange={setIsImageUploaded} />
          <Input
            label="내용"
            required
            placeholder="내용을 입력해주세요. (최대 30자)"
            className="long-text"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>

        <div className="button-wrap">
          <Button
            type="primary"
            buttonName={loading ? "업로드 중..." : "업로드하기"}
            disabled={isButtonDisabled || loading}
            onClick={handleUpload}
          />
        </div>
      </div>
    </SignupLayout>
  );
};

export default PenaltyUpload;