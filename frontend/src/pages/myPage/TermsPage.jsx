import React from 'react';
import MainLayout from '@/pages/MainLayout';

const TermsPage = () => {
  return (
    <MainLayout
      headerProps={{
        title: '이용약관',
        type: 'header-b',
        icon1: 'arrow-left',
      }}
    >
      <div className="page-content">
        <h2>이용약관</h2>
        <p>이 앱은 사용자에게 그룹 기반의 벌칙/미션 기능을 제공합니다.</p>
        <p>서비스 이용 시 아래와 같은 사항을 지켜야 합니다:</p>
        <ul>
          <li>타인의 정보를 도용하거나 해를 끼치지 않아야 합니다.</li>
          <li>서비스 운영을 방해하는 행위를 해선 안 됩니다.</li>
        </ul>
      </div>
    </MainLayout>
  );
};

export default TermsPage;