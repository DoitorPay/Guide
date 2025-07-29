import React, { useState } from 'react';
import LandingLayout from "@/pages/landingLayout";
import KaKaoLoginRedirectButton from "@/components/button/kakaoButton";
import NaverLoginRedirectButton from "@/components/button/NaverButton";

const Landing = () => {
    const landingTitle = [
        "죽음의 스터디를 시작한다",
        "오늘도 딱!대와 함께",
        "벌칙을 피해라",
        "딱!대와 함께 숨막히는 레이스"
    ];

    const randomLandingTitle = useState(() => {
        const randomIndex = Math.floor(Math.random() * landingTitle.length);
        return landingTitle[randomIndex];
    });

    return(
        <LandingLayout>
            <div className="landing-wrapper">
                <div className="visual-container">
                    <img src="/images/logo-white.png"/>
                    <p className="title">{randomLandingTitle}</p>
                </div>

                <div className="signup-button-container">
                    <KaKaoLoginRedirectButton />
                    <NaverLoginRedirectButton />
                </div>
            </div>
        </LandingLayout>
    )
}

export default Landing;