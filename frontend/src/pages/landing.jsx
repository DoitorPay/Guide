import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LandingLayout from "@/pages/landingLayout";
import KaKaoLoginRedirectButton from "@/components/button/kakaoButton";
import NaverLoginRedirectButton from "@/components/button/NaverButton";
import useAuthStore from '@/stores/useAuthStore';

const Landing = () => {
  const navigate = useNavigate();
  const { isLoggedIn, isAuthLoading } = useAuthStore();

  const landingTitle = [
    "죽음의 스터디를 시작한다",
    "오늘도 딱!대와 함께",
    "벌칙을 피해라",
    "딱!대와 함께 숨막히는 레이스"
  ];

  const [randomLandingTitle] = useState(() => {
    const randomIndex = Math.floor(Math.random() * landingTitle.length);
    return landingTitle[randomIndex];
  });

  useEffect(() => {
    if (!isAuthLoading && isLoggedIn) {
      navigate('/main');
    }
  }, [isLoggedIn, isAuthLoading]);

  return (
    <LandingLayout>
      <div className="landing-wrapper">
        <div className="visual-container">
          <img src="/images/logo-white.png" alt="로고" />
          <p className="title">{randomLandingTitle}</p>
        </div>

        <div className="signup-button-container">
          <KaKaoLoginRedirectButton />
          <NaverLoginRedirectButton />
        </div>
      </div>
    </LandingLayout>
  );
};

export default Landing;
