import React from "react";
import MainLayout from "@/pages/mainLayout";

const Login = () => {
  const handleSocialLogin = (provider) => {
    localStorage.setItem('sns', provider);
    window.location.href = `http://localhost:8000/auth/${provider}/login`;
  };

  return (
    <MainLayout
       headerProps={{
        type: "default",
        icon1: "notifications",
      }}>
          <div className="login-wrapper">
      <h2>간편 로그인</h2>
      <button
        onClick={() => handleSocialLogin("kakao")}
        style={{ backgroundColor: "#FEE500", padding: "10px", margin: "10px" }}
      >
        카카오로 시작하기
      </button>
      <button
        onClick={() => handleSocialLogin("naver")}
        style={{ backgroundColor: "#03C75A", color: "white", padding: "10px" }}
      >
        네이버로 시작하기
      </button>
    </div>

      </MainLayout>
    
  );
};

export default Login;
