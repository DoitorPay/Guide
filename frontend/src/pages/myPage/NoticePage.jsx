import React from 'react';
import MainLayout from '@/pages/MainLayout';

const NoticePage = () => {
  return (
    <MainLayout
      headerProps={{
        title: '공지사항',
        type: 'header-b',
        icon1: 'arrow-left',
      }}
    >
      <div className="page-content">
        <h2>📢 공지사항</h2>
        <p>앱을 최신 버전으로 유지해 주세요.</p>
        <p>불편 사항이나 문의는 고객센터를 이용해주세요.</p>
      </div>
    </MainLayout>
  );
};

export default NoticePage;
