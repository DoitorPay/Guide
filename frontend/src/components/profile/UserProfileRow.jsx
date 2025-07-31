import React from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';
import { formatDistanceToNowStrict, isValid } from 'date-fns';
import { ko } from 'date-fns/locale';

const isValidDate = (date) => {
  const d = new Date(date);
  return isValid(d);
};

const UserProfileRow = ({
  src,
  name,
  date,
  variant = 'horizontal',
  size = 40,
  border = false,
  isLeader = false,
  nameWeight = 'default',
  onClick, 
}) => {
  const displayName = isLeader ? `${name}(그룹장)` : name;

  const formattedDate =
    variant === 'postMeta' && isValidDate(date)
      ? formatDistanceToNowStrict(new Date(date), { addSuffix: true, locale: ko })
      : null;

  return (
    <div className={`user-profile user-${variant}`} onClick={onClick}> 
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
