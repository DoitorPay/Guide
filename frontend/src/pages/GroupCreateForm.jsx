import { React, useState } from 'react';
import Input from '@/components/input/Input';
import Checkbox from '@/components/input/Checkbox';
import Button from '@/components/button/button.jsx';
import SubTitle from '@/components/subtitle/subTitle';
import MainLayout from '@/pages/MainLayout';


const GroupCreateForm = () => {

    const [isChecked, setIsChecked] = useState(false);
    
  return (
    <MainLayout
              headerProps={{
                type: "default",
                icon1: "notifications",
              }}
            >
                <form className="group-create-form">
      <SubTitle title="그룹 정보를 입력해주세요" />
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
<p>그룹 대표 사진</p>
<p>그룹 목표 개수</p>
      <Input
        label="그룹 미션 인증 요일"
        name="missionDay"
        placeholder="요일을 선택해주세요."
        required
      />
<p>그룹 미션 인증 요일</p>
    <div className="form-terms">
        <p>그룹 유지일</p>
                  <Checkbox checked={isChecked} onChange={setIsChecked} />
            
        </div>
        <Button
        type="primary"
        buttonName="생성하기"
        />
    </form>
            </MainLayout>
  );
};

export default GroupCreateForm;
