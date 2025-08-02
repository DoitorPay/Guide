import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const defaultAvatar = '/images/default-avatar.png';

const ProfileImage = ({
  src,         
  size = 40,
  alt = '프로필 이미지',
  className = '',
  border = false,
}) => {
  const { profile, fetchUserInfo } = useUserStore();
  const [imgSrc, setImgSrc] = useState(src || profile || defaultAvatar);

  useEffect(() => {
    if (!src) {
      fetchUserInfo();
    }
  }, [src, fetchUserInfo]);

  useEffect(() => {
    if (!src && profile) {
      setImgSrc(profile);
    }
  }, [src, profile]);

  const handleError = (e) => {
    e.currentTarget.src = defaultAvatar;
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={`profile-image ${border ? 'with-border' : ''} ${className}`}
      style={{ width: size, height: size, borderRadius: '50%' }}
    />
  );
};

export default ProfileImage;
