import React from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';
import { formatDistanceToNowStrict } from 'date-fns';
import { ko } from 'date-fns/locale';

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

 const formattedDate =
  variant === 'postMeta' && date
    ? formatDistanceToNowStrict(new Date(date), { addSuffix: true, locale: ko })
    : null;

  return (
    <div className={`user-profile user-${variant}`}>
      <ProfileImage src={src} size={size} border={border} />
      <div className="user-info">
        <ProfileName name={displayName} size="md" weight={nameWeight} />
        {variant === 'postMeta' && formattedDate && (
          <span className="user-date">{formattedDate}</span>
        )}
      </div>
    </div>
  );
};


export default UserProfileRow;
