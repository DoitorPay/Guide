import React from 'react';
import '@/assets/css/components/mainLayout.scss';

const LandingLayout = ({ children, className = '', contentBg = 'var(--color-gray-scale-white)' }) => {
  return (
    <div className={`wrapper ${className}`}>
      <div className="main-layout">
        <section className="content-area" style={{ backgroundColor: contentBg }}>
          {children}
        </section>
      </div>
    </div>
  );
};

export default LandingLayout;


// 사용 방법!
// import MainLayout from "@/pages/MainLayout";

// const 어쩌구페이지 = () => {
//   return (
//     <MainLayout
//       headerProps={{
//         type: "header-a",
//         title: "마이페이지",
//         icon1: "settings",
//         icon2: "logout",
//         icon1OnClick: () => alert("아이콘1 클릭"),
//         icon2OnClick: () => alert("아이콘2 클릭")
//       }}
//     >
//       <컴포넌트/>
//     </MainLayout>
//   );
// };