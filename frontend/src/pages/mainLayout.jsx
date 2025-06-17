import React from 'react';
import '@/assets/css/components/mainLayout.scss';
import Navigation from '@/components/nav';
import Header from "@/components/header"

const MainLayout = () => {
  return (
    <div className="wrapper">
    <div className="main-layout">
      <Header />
      <section className="content-area">
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
        <div className="content-box" />
      </section>

      <footer>
        <Navigation/>
      </footer>
    </div>
    </div>
  );
};

export default MainLayout;
