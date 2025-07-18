import React from 'react';
import LandingLayout from "@/pages/landingLayout";
import KaKaoLoginRedirectButton from "@/components/button/kakaoButton";
import NaverLoginRedirectButton from "@/components/button/NaverButton";

const Landing = () => {
    return(
        <LandingLayout>
            <div className="landing-wrapper">
                <div className="visual-container">
                    <img src="/src/assets/image/common/logo-white.png"/>
                    <p className="title">죽음의 스터디를 시작한다</p>
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