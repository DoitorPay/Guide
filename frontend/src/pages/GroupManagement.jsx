import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Input from '@/components/input/Input';
import Button from '@/components/button/button';
import SignupLayout from '@/pages/SignupLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';
import Popup from '@/components/popupModal/popup';
import TossGroupAdmin from '@/components/group/tossGroupAdmin';
import { uploadImage } from '@/utils/uploadImage';

const GroupManagement = () => {
  const [dissolvePopup, setDissolvePopup] = useState(false);
  const [tossPopup, setTossPopup] = useState(false);

  // 그룹 정보 상태
  const [groupImage, setGroupImage] = useState(''); // 업로드된 이미지 URL
  const [formData, setFormData] = useState({
    groupName: '',
    groupDescription: '',
    missionCount: 0,
  });

  const toggleDissolvePopup = () => setDissolvePopup(!dissolvePopup);
  const toggleTossPopup = () => setTossPopup(!tossPopup);

  const handleImageUpload = async (file) => {
    const url = await uploadImage({ file, type: 'group-profile' });
    setGroupImage(url);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <SignupLayout
      headerProps={{
        title: "ㅤ그룹 관리",
        type: "header-b",
        icon1: 'none'
      }}
    >
      <form className="group-management-form">
        <div className="input-wrap">
          <ImageUploader
            label="그룹 대표 사진"
            onChange={handleImageUpload}
            preview={groupImage}
          />

          <Input
            label="그룹 이름"
            name="groupName"
            placeholder="기존 그룹 이름"
            value={formData.groupName}
            onChange={handleChange}
            required
          />

          <Input
            label="그룹 설명"
            name="groupDescription"
            placeholder="기존 그룹 설명"
            value={formData.groupDescription}
            onChange={handleChange}
            required
          />

          <MissionCount
            onChange={(e) =>
              setFormData((prev) => ({
                ...prev,
                missionCount: e.target.value,
              }))
            }
          />

          <div className="form-terms">
            <Button type="third" buttonName="그룹 해산" onClick={toggleDissolvePopup} />
            <Button type="third" buttonName="그룹 운영 위임" onClick={toggleTossPopup} />
          </div>
        </div>

        <div className="confirm-wrap">
          <Button type="primary" buttonName="수정 완료" />
        </div>
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
        members={[
          { id: 1, name: "홍길동", profile: "/images/default-avatar.png" },
          { id: 2, name: "홍길순", profile: "/images/default-avatar.png" },
          { id: 3, name: "홍길차", profile: "/images/default-avatar.png" },
        ]}
        onClick={toggleTossPopup}
        setPopup={tossPopup}
      />
    </SignupLayout>
  );
};

export default GroupManagement;
