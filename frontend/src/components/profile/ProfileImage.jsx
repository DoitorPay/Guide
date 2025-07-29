import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';

const defaultAvatar = '/images/default-avatar.png';

const ProfileImage = ({
  src,
  alt = '프로필 이미지',
  size = 40,
  className = '',
  border = false,
}) => {
  const [imgSrc, setImgSrc] = useState(src || defaultAvatar);
  const { profileImage, fetchProfileImage } = useUserStore();

  useEffect(() => {
    if (!src) {
      fetchProfileImage();
    }
  }, []);

  useEffect(() => {
    if (!src && profileImage) {
      setImgSrc(profileImage);
    }
  }, [profileImage]);

  const handleError = () => {
    if (imgSrc !== defaultAvatar) {
      setImgSrc(defaultAvatar);
    }
  };

  return (
    <img
      src={imgSrc}
      alt={alt}
      onError={handleError}
      className={`profile-image ${border ? 'with-border' : ''} ${className}`}
      style={{
        width: size,
        height: size,
      }}
    />
  );
};

export default ProfileImage;
