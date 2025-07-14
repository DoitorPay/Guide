import { React, useState } from 'react';
import Input from '@/components/input/Input';
import SubTitle from '@/components/subtitle/subTitle';
import Button from '@/components/button/button.jsx';
import MainLayout from '@/pages/MainLayout';


const GroupMissionForm = () => {
    
  return (
    <MainLayout
              headerProps={{
                type: "default",
                icon1: "notifications",
              }}
            >
        <form className="group-create-form">
        <SubTitle title="설정된 그룹 미션 개수 : 2개"/>
            {/* 그룹 미션 개수 props로 받아와야함 */}

      <span className="required">*</span> <span>는 필수 입력란입니다.</span>

      <Input
        label="그룹 이름"
        name="groupName"
        placeholder="그룹 이름을 입력해주세요."
        required
      />

      <Input
        label="그룹 설명"
        name="groupDescription"
        placeholder="그룹 설명을 적어주세요."
        required
      />
      <Input
        label="그룹 미션 인증 요일"
        name="missionDay"
        placeholder="요일을 선택해주세요."
        required
      />
    <div className="form-terms">
        
        </div>
        <Button
        type="primary"
        buttonName="생성 완료"
        />
    </form>
            </MainLayout>
  );
};

export default GroupMissionForm;
