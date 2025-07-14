import { React, useState } from 'react';
import Input from '@/components/input/Input';
import SubTitle from '@/components/subtitle/subTitle';
import Button from '@/components/button/button.jsx';
import MainLayout from '@/pages/MainLayout';
import ImageUploader from '@/components/group/ImageUploader';
import MissionCount from '@/components/group/MissionCount';


const GroupManagement = () => {
    
  return (
    <MainLayout
              headerProps={{
                type: "default",
                icon1: "notifications",
              }}
            >
        <form className="group-management-form">

    <ImageUploader / >
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
        type="default"
        buttonName="그룹 해산"
        />
         <Button
        type="default"
        buttonName="그룹 운영 위임"
        />
        </div>
        <Button
        type="primary"
        buttonName="생성 완료"
        />
    </form>
            </MainLayout>
  );
};

export default GroupManagement;
