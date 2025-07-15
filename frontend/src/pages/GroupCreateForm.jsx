import { React, useState } from 'react';
import Input from '@/components/input/Input';
import Checkbox from '@/components/input/Checkbox';
import Button from '@/components/button/button.jsx';
import SubTitle from '@/components/subtitle/subTitle';
import MainLayout from '@/pages/MainLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';

const GroupCreateForm = () => {

    const [isChecked, setIsChecked] = useState(false);
    
  return (
    <MainLayout
              headerProps={{
                type: "header-b",
                title: "그룹 생성",
                icon1: "none",
            }}
            >
           <form className="group-create-form">
  <SubTitle title="그룹 정보를 입력해주세요" />
  <div className="info-text">
    <span className="required">*</span> <span>는 필수 입력란입니다.</span>
  </div>

  <div className="form-section">
    <Input
      label="그룹 이름"
      name="groupName"
      placeholder="그룹 이름을 입력해주세요."
      required
    />
  </div>

  <div className="form-section">
    <Input
      label="그룹 설명"
      name="groupDescription"
      placeholder="그룹 설명을 적어주세요."
      required
    />
  </div>

  <div className="form-section">
    <p>그룹 대표 사진 <span className="required">*</span></p>
    <ImageUploader />
  </div>

  <div className="form-section">
    <Input
      label="스터디 주제"
      name="studyTopic"
      placeholder="주제 선택"
      required
    />
  </div>

  <div className="form-section">
    <p>그룹 목표 개수 <span className="required">*</span></p>
    <MissionCount />
  </div>

  <div className="form-section">
    <Input
      label="그룹 미션 인증 요일"
      name="missionDay"
      placeholder="요일을 선택해주세요."
      required
    />
  </div>

  <div className="form-section form-terms">
    <p>그룹 유지일 <span className="required">*</span></p>
    <Checkbox checked={isChecked} onChange={setIsChecked} />
    <p>기간을 정하지 않고 진행할래요. (추후 그룹해산을 통해 스터디를 종료할 수 있습니다.)</p>
  </div>

  <div className="form-section">
    <Button type="primary" buttonName="생성하기" />
  </div>
</form>

</MainLayout>
  );
};

export default GroupCreateForm;
