import React, { useEffect } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const defaultAvatar = '/images/default-avatar.png';

const ProfileImage = ({ size = 40, alt = '프로필 이미지', className = '', border = false }) => {
  const { profile, fetchUserInfo } = useUserStore();

  useEffect(() => {
    fetchUserInfo(); 
  }, []);

  const handleError = (e) => {
    e.currentTarget.src = defaultAvatar;
  };

  return (
    <img
      src={profile || defaultAvatar}
      alt={alt}
      onError={handleError}
      className={`profile-image ${border ? 'with-border' : ''} ${className}`}
      style={{ width: size, height: size, borderRadius: '50%' }}
    />
  );
};

export default ProfileImage;
