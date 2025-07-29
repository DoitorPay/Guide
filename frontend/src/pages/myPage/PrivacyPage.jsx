import React from 'react';
import MainLayout from '@/pages/MainLayout';

const PrivacyPage = () => {
  return (
    <MainLayout
      headerProps={{
        title: '개인정보 처리 방침',
        type: 'header-b',
        icon1: 'arrow-left',
      }}
    >
      <div className="page-content">
        <h2>개인정보 처리 방침</h2>
        <p>당사는 사용자의 개인정보를 안전하게 관리합니다.</p>
        <p>수집된 정보는 다음 목적에 사용됩니다:</p>
        <ul>
          <li>서비스 제공 및 운영</li>
          <li>회원 관리 및 본인 인증</li>
        </ul>
        <p>자세한 내용은 전체 방침을 참고해주세요.</p>
      </div>
    </MainLayout>
  );
};

export default PrivacyPage;
