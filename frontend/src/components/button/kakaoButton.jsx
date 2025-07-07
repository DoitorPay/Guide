import React from "react";

const KaKaoLoginRedirectButton = () => {
    const handleLogin = () => {
    window.location.href = "http://localhost:8000/auth/kakao/login";
  };

    return (
        <button
              type="button"
              onClick={handleLogin}
              className="bg-yellow-400 hover:bg-yellow-500 text-white font-semibold py-2 px-4 rounded transition"
            >
              카카오 로그인
            </button>
    )
};

export default KaKaoLoginRedirectButton;