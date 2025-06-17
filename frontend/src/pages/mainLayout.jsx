import React from 'react';
import '@/assets/css/components/mainLayout.scss';
import Navigation from '@/components/nav';
import Header from "@/components/header"

const MainLayout = ({ children }) => {
  return (
    <div className="wrapper">
      <div className="main-layout">
        <Header />
        <section className="content-area">
          {children}
        </section>
        <footer>
          <Navigation />
        </footer>
      </div>
    </div>
  );
};


export default MainLayout;

// 사용 방법!
// import MainLayout from '@/components/MainLayout';

// const 어쩌구 = () => (
//   <MainLayout>
//     <컴포넌트 />
//     <컴포넌트 />
//     <컴포넌트 />
//   </MainLayout>
// );
