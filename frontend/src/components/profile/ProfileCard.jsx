import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';

const ProfileCard = ({ status = '아자아자 화이팅 ~!', onClick }) => {
  const [nickname, setNickname] = useState('닉네임');
  const [profileImage, setProfileImage] = useState('');

  useEffect(() => {
    axios.get('/api/user/nickname')
      .then(res => {
        setNickname(res.data.profile);
      })
      .catch(err => {
        console.error('닉네임 불러오기 실패:', err);
      });

    axios.get('/api/user/profile_img')
      .then(res => {
        setProfileImage(res.data.profile);
      })
      .catch(err => {
        console.error('프로필 이미지 불러오기 실패:', err);
      });
  }, []);

  return (
    <div className="profile-card" onClick={onClick}>
      <ProfileImage src={profileImage} size={100} className="profile-card__image" />
      <div className="profile-card__info">
        <ProfileName name={nickname} size="md" />
        <span className="profile-card__status">{status}</span>
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
