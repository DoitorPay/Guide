import React from 'react';
import SettingSection from "@/components/myPage/SettingSection";


function settingGuide() {

  return (
    <div>
      <SettingSection
        items={[
          { label: '친구 초대'},
          { label: '공지사항'},
          { label: '도움말'},
        ]}
      />

    {/* 섹션간여백 */}
      <div style={{ height: '12px' }} />

      <SettingSection
        items={[
          { label: '이용약관'},
          { label: '개인정보 처리 방침'},
          { label: '앱버전', rightText: '1.0.1' },
        ]}
      />
    </div>
  );
}

export default settingGuide;
