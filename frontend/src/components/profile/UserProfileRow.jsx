import React from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';

const UserProfileRow = ({
  src,
  name,
  date,
  variant = 'horizontal',
  size = 40,
  border = false,
  isLeader = false,
  nameWeight = 'default',
}) => {
  const displayName = isLeader ? `${name}(그룹장)` : name;

  return (
    <div className={`user-profile user-${variant}`}>
      <ProfileImage src={src} size={size} border={border} />
      <div className="user-info">
        <ProfileName name={displayName} size="md" weight={nameWeight}/>
        {variant === 'postMeta' && <span className="user-date">{date}</span>}
      </div>
    </div>
  );
};


export default UserProfileRow;
