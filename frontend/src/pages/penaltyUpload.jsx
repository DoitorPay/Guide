import React, { useState } from "react";
import SignupLayout from "@/pages/SignupLayout";
import ImageUploader from "@/components/group/ImageUploader";
import Input from "@/components/Input/input";
import Button from "@/components/button/button";

const PenaltyUpload = () => {
  const [content, setContent] = useState("");
  const [isImageUploaded, setIsImageUploaded] = useState(false);

  const isButtonDisabled = content.trim() === "" || !isImageUploaded;

  const dummyPunishment = {
    title: "엉덩이로 이름쓰기",
    groupName: "dsad",
    deadline: "2025.08.01",
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
            <span>{dummyPunishment.title}</span>
          </div>
          {/* <div className="penalty-info-row">
            <strong>그룹</strong>
            <span>{dummyPunishment.groupName}</span>
          </div>
          <div className="penalty-info-row">
            <strong>마감일</strong>
            <span>{dummyPunishment.deadline}</span>
          </div> */}
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
            buttonName="업로드하기"
            disabled={isButtonDisabled}
          />
        </div>
      </div>
    </SignupLayout>
  );
};

export default PenaltyUpload;
