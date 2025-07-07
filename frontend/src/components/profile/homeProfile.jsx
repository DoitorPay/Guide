import React from 'react';
import ProfileImage from '@/components/profile/ProfileImage';

const HomeProfile = ({ name = 'ㅁㄴㅇㄹ', avatar }) => {
  return (
    <div className="home-profile">
      <div className="home-profile-text">
        <p>오늘 큰 전진입니다 {name}님!</p>
        <p>계속하세요!</p>
      </div>
      <div className="home-profile-avatar">
        <ProfileImage src={avatar} alt={`${name}님의 프로필`} size={68} />
      </div>
    </div>
  );
};

export default HomeProfile;
