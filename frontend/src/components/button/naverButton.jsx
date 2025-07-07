import React from "react";

const NaverLoginRedirectButton = () => {
    const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/naver/login";
  };

    return (
        <button
              type="button"
              onClick={handleLogin}
            >
              네이버 로그인
            </button>
    )
};

export default NaverLoginRedirectButton;