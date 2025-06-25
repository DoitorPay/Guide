import React from 'react';
import '@/assets/css/components/mainLayout.scss';
import Navigation from '@/components/nav';
import Header from "@/components/header"
import WeekCalendar from "@/components/WeekCalendar";
import Input from "@/components/input";
import arrowIcon from "/icons/arrow-right.svg";


const MainLayout = ({ children, headerProps }) => {
  return (
    <div className="wrapper">
      <div className="main-layout">
        <Header {...headerProps} />
        <section className="content-area">
          {children}
          <WeekCalendar/>
          <WeekCalendar type="todolist" />
          <Input
            label="다음"
            name="next"
            icon={<img src={arrowIcon} alt="화살표" className="svg-icon" />}
          />
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
// import MainLayout from "@/components/MainLayout";

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