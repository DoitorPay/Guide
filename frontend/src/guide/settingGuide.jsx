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

      <SettingSection
        items={[
          { label: '이용약관'},
          { label: '개인정보 처리 방침'},
          { label: '앱 버전', type: 'text', text: '1.0.0' },
        ]}
      />

      <SettingSection
        items={[
            { label: '로그아웃', type: 'none' },
        ]}
        />
    </div>
  );
}

export default settingGuide;
