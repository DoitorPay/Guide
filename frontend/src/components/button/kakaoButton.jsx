import React from "react";

const KaKaoLoginRedirectButton = () => {
    const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/kakao/login";
  };

    return (
        <button
              type="button"
              onClick={handleLogin}
              className="signup-button kakao"
            >
              <img src="/icons/kakao.svg"/>
              카카오 로그인
            </button>
    )
};

export default KaKaoLoginRedirectButton;