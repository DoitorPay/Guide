import { React, useState } from 'react';
import Input from '@/components/input/Input';
import SubTitle from '@/components/subtitle/subTitle';
import Button from '@/components/button/button.jsx';
import SignupLayout from '@/pages/signupLayout';
import ImageUploader from '@/components/group/ImageUploader';


const GroupMissionForm = () => {
    
  return (
    <SignupLayout
              headerProps={{
                type: "header-b",
                title: "ㅤ그룹 미션",
                icon1: 'none',
              }}
            >
        <form className="group-create-form">

          <div className="form-section">
              <SubTitle title="설정된 그룹 미션 개수 : 2개"/>
            {/* 그룹 미션 개수 props로 받아와야함 */}
          </div>

          <span className="required">*</span> <span>는 필수 입력란입니다.</span>

      <div className="form-section">
      <Input
        label="미션 1"
        name="mission1"
        placeholder="미션을 작성해주세요. (최대 30자)"
        required
      />
      </div>

      <div className="form-section">
      <Input
        label="미션 2"
        name="mission2"
        placeholder="미션을 작성해주세요. (최대 30자)"
        required
      />
      </div>

      <div className="form-section">
      <Input
        label="미션 3"
        name="mission3"
        placeholder="미션을 작성해주세요. (최대 30자)"
        required
      />
      </div>
      <div className="form-section">
    <div className="form-terms">
        
        </div>
        <Button
        type="primary"
        buttonName="생성 완료"
        />
      </div>
    </form>
            </SignupLayout>
  );
};

export default GroupMissionForm;
