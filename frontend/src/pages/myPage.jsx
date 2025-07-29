import React from 'react';
import { useNavigate } from 'react-router-dom'; 
import MainLayout from "@/pages/MainLayout";
import ProfileCard from '@/components/profile/ProfileCard';
import LevelProgress from '@/components/myPAge/LevelProgress';
import SettingSection from "@/components/myPage/SettingSection";

const MyPage = () => {
  const navigate = useNavigate(); 

  const handleProfileClick = () => {
    navigate('/profile'); 
  };

  return (
    <MainLayout
      contentBg="var(--color-background)"
      className='mypage-wrap'
      headerProps={{
        title: "마이페이지",
        type: "header-a",
        icon1: "brightness-high-gray",
      }}
    >
      <ProfileCard onClick={handleProfileClick} /> 

      <div>
        <LevelProgress />
      </div>

      <div>
        <SettingSection
          items={[
            { label: '친구 초대' },
            { label: '공지사항' },
            { label: '도움말' },
          ]}
        />

        <SettingSection
          items={[
            { label: '이용약관' },
            { label: '개인정보 처리 방침' },
            { label: '앱 버전', type: 'text', text: '1.0.0' },
          ]}
        />

        <SettingSection
          items={[
            { label: '로그아웃', type: 'none' },
          ]}
        />
      </div>
    </MainLayout>
  );
};

export default MyPage;
