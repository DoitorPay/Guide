import React from 'react';
import '@/assets/css/components/mainLayout.scss';

const MainLayout = () => {
  return (
    <div className="wrapper">
    <div className="main-layout">
      <header className="header">
        <div className="menu" />
        <div className="icons" />
      </header>

      <section className="main-banner" />

      <section className="content-area">
        <div className="content-box" />
        <div className="content-box" />
      </section>

      <footer className="bottom-nav">
        <div className="nav-item" />
        <div className="nav-item" />
        <div className="nav-item" />
        <div className="nav-item" />
        <div className="nav-item" />
      </footer>
    </div>
    </div>
  );
};

export default MainLayout;
