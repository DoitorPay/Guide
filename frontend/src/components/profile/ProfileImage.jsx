import React, { useEffect, useState } from 'react';
import { getImageURL } from '@/utils/getImageURL';
import { useUserStore } from '@/stores/useUserStore';

const defaultAvatar = '/images/default-avatar.png';

const ProfileImage = ({
  src,
  size = 40,
  alt = '프로필 이미지',
  className = '',
  border = false,
  userId: propUserId,
  userSns: propUserSns,
}) => {
  const {
    profile,
    fetchUserInfo,
    userId: storeUserId,
    sns: storeUserSns,
  } = useUserStore();

  const userId = propUserId || storeUserId;
  const userSns = propUserSns || storeUserSns;

  const [imgSrc, setImgSrc] = useState(defaultAvatar);

  useEffect(() => {
    const fetchImage = async () => {
      if (src) {
        setImgSrc(src);
        return;
      }

      if (!userId || !userSns) {
        await fetchUserInfo();
        if (profile) {
          setImgSrc(profile);
        } else {
          setImgSrc(defaultAvatar);
        }
        return;
      }

      try {
        const url = await getImageURL({ reason: 'userProfile', userId, userSns });
        console.log('[getImageURL] 받은 URL:', url);
        setImgSrc(url || defaultAvatar);
      } catch (err) {
        console.error('[getImageURL] 오류:', err);
        setImgSrc(defaultAvatar);
      }
    };

    fetchImage();
  }, [src, userId, userSns]); // ❗ profile은 제거

  const handleError = (e) => {
    e.currentTarget.src = defaultAvatar;
  };

  console.log('[ProfileImage] 최종 imgSrc:', imgSrc);

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
