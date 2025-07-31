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
            { label: '친구 초대', onClick: () => alert('개발 중인 기능입니다.') },
            { label: '공지사항', to: '/notice' },
            { label: '도움말', to: '/help'  },
          ]}
        />

        <SettingSection
          items={[
            { label: '이용약관', to: '/terms' },
            { label: '개인정보 처리 방침', to: '/privacy' },
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
