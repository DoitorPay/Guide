import React from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';

const UserProfileRow = ({ src, name, date, variant = 'horizontal', size = 40 }) => {
  return (
    <div className={`user-profile user-${variant}`}>
      <ProfileImage src={src} size={size} />
      <div className="user-info">
        <ProfileName name={name} size="sm" />
        {variant === 'postMeta' && <span className="user-date">{date}</span>}
      </div>
    </div>
  );
};

export default UserProfileRow;
