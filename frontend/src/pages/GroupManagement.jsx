import { React, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/input/Input';
import Button from '@/components/button/button.jsx';
import SignupLayout from '@/pages/SignupLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';
import Popup from '@/components/popupModal/popup';
import TossGroupAdmin from '@/components/group/tossGroupAdmin';


const GroupManagement = () => {
  const navigate = useNavigate();
  const handleGoBack = () => {
      navigate(-1);
  };

  // 해산, 위임 팝업 컨트롤
  const [dissolvePopup, setDissolvePopup] = useState(false);
  const [tossPopup, setTossPopup] = useState(false);

  function toggleDissolvePopup() {
      setDissolvePopup(!dissolvePopup);
  };
  function toggleTossPopup() {
    setTossPopup(!tossPopup);
  };

  // 더미데이터, API연동
  const members = [
    { id: 1, name: "홍길동", profile: "/images/default-avatar.png" },
    { id: 2, name: "홍길순", profile: "/images/default-avatar.png" },
    { id: 3, name: "홍길차", profile: "/images/default-avatar.png" },
    { id: 4, name: "홍길타", profile: "/images/default-avatar.png" },
    { id: 5, name: "홍길오", profile: "/images/default-avatar.png" },
    { id: 6, name: "홍길동", profile: "/images/default-avatar.png" },
    { id: 7, name: "홍길순", profile: "/images/default-avatar.png" },
    { id: 8, name: "홍길차", profile: "/images/default-avatar.png" },
    { id: 9, name: "홍길타", profile: "/images/default-avatar.png" },
    { id: 10, name: "홍길오", profile: "/images/default-avatar.png" },
];

  return (
    <SignupLayout
      headerProps={{
        title: "프로필",
        type: "header-b",
        icon1: "arrow-left",
        icon1OnClick: handleGoBack }}
    >
      <form className="group-management-form">


        <ImageUploader
          label="그룹 대표 사진"
        />
        <Input
          label="그룹 이름"
          name="groupName"
          placeholder="기존 그룹 이름"
          required
        />

        <Input
          label="그룹 설명"
          name="groupDescription"
          placeholder="기존 그룹 설명"
          required
        />

        <MissionCount />
        <div className="form-terms">
          <Button
            type="third"
            buttonName="그룹 해산"
            onClick={toggleDissolvePopup}
          />
          <Button
            type="third"
            buttonName="그룹 운영 위임"
            onClick={toggleTossPopup}
          />
        </div>
        <Button
          type="primary"
          buttonName="생성 완료"
        />
      </form>
      <Popup
          icon="error-gray"
          title="그룹을 해산하시겠어요?"
          subtitle="해산한 그룹은 다시 복구할 수 없어요."
          buttonName="해산"
          onSecondClick={toggleDissolvePopup}
          button2Name="취소"
          setPopup={dissolvePopup}
        />
        <TossGroupAdmin
          members={members}
          onClick={toggleTossPopup}
          setPopup={tossPopup}
        />
    </SignupLayout>
  );
};

export default GroupManagement;
