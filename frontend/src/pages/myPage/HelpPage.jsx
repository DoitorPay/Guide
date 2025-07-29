import React from 'react';
import MainLayout from '@/pages/MainLayout';

const HelpPage = () => {
  return (
    <MainLayout
      headerProps={{
        title: '도움말',
        type: 'header-b',
        icon1: 'arrow-left',
      }}
    >
      <div className="page-content">
        <h2>도움말</h2>
        <p>앱 이용 중 궁금한 점이 있으신가요?</p>
        <p>자세한 내용은 고객센터로 문의해주세요.</p>
      </div>
    </MainLayout>
  );
};

export default HelpPage;