import React from 'react';
import UserProfileRow from '@/components/profile/UserProfileRow';
import LikeButton from '@/components/button/likeButton';

const HeartProfile = ({
  avatar = '',
  user = '',
  date = '',
  liked = false,
  likeCount = 0,
}) => {
  return (
    <div className="heart-profile-wrapper">
      <UserProfileRow
        src={avatar}
        name={user}
        date={date}
        variant="postMeta"
        size={46}
        nameWeight="semibold"
      />
      <LikeButton
        initialLiked={liked}
        initialCount={likeCount}
        filledHeartSrc="/icons/heart-filled.svg"
        emptyHeartSrc="/icons/heart-empty.svg"
        size={24}
      />
    </div>
  );
};

export default HeartProfile;
