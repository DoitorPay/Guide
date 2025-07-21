import React from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';

const ProfileCard = ({
    name = '이름(닉네임)',
    status = '아자아자 화이팅 ~ !',
    imageSrc = '',
    onClick,
  }) => {
    return (
      <div className="profile-card" onClick={onClick}>
        <ProfileImage src={imageSrc} size={100} className="profile-card__image" />
        <div className="profile-card__info">
          <ProfileName name={name} size="md" weight="semibold"/>
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