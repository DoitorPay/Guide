import React, { useState, useEffect } from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';


const ProfileCard = ({ onClick }) => {
  const [nickname, setNickname] = useState('로딩 중...');

  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await fetch('http://localhost:8000/user/nickname', { credentials: 'include' });
        const data = await res.json();
        setNickname(data.profile);
      } catch (error) {
        console.error('닉네임 불러오기 실패:', error);
        setNickname('사용자');
      }
    };

    fetchNickname();
  }, []);

  return (
    <div className="profile-card" onClick={onClick}>
      <ProfileImage size={100} className="profile-card__image" />
      <div className="profile-card__info">
        <ProfileName name={nickname} size="md" />
        <span className="profile-card__status">아자아자 화이팅 ~ !</span>
      </div>
      <img
        src="/icons/arrow-right-orange.svg"
        alt="arrow"
        className="profile-card__arrow"
      />
    </div>
  );
};

export default ProfileCard;
///