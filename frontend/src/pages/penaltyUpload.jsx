import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SignupLayout from "@/pages/SignupLayout";
import ImageUploader from "@/components/group/ImageUploader";
import Input from "@/components/Input/input";
import Button from "@/components/button/button";
import { useUserGroupStore } from "@/stores/useUserGroupStore";
import axios from "axios";

const PenaltyUpload = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const selectedPunishment = state?.punishment || "벌칙이 선택되지 않았어요";

  const { activeGroups } = useUserGroupStore();
  const [content, setContent] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);
  const [loading, setLoading] = useState(false);

  const isButtonDisabled = content.trim() === "" || !isImageUploaded;

  const selectedGroup = activeGroups.find(group =>
    (group.punish || []).includes(selectedPunishment)
  );

  const groupId = selectedGroup?.gid;

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
      await axios.post('http://localhost:8000/user/punishFeed', payload, {
        withCredentials: true,
      });
      alert("업로드 완료!");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("벌칙 업로드 실패:", error);
      alert("업로드 중 오류 발생");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SignupLayout
      headerProps={{
        type: "header-b",
        title: "벌칙 업로드",
        icon2: "arrow-left",
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
