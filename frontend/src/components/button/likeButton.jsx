import React, { useState } from 'react';

const LikeButton = ({
  initialCount = 0,
  initialLiked = false,
  filledHeartSrc = '/icons/heart-filled.svg',
  emptyHeartSrc = '/icons/heart-empty.svg',
  size = 24,
}) => {
  const [liked, setLiked] = useState(initialLiked);
  const [count, setCount] = useState(initialCount);

  const handleClick = () => {
    setLiked(!liked);
    setCount(prev => (liked ? prev - 1 : prev + 1));
  };

  return (
    <div
      className="like-button"
      onClick={handleClick}
      style={{ display: 'flex', alignItems: 'center', gap: '4px', cursor: 'pointer' }}
    >
      <span style={{ fontSize: 'clamp(14px, 3vw, 18px)', color: 'var(--color-gray-scale-600)' }}>{count}</span>
      <img
        src={liked ? filledHeartSrc : emptyHeartSrc}
        alt={liked ? '좋아요 취소' : '좋아요'}
        style={{ width: size, height: size }}
      />
    </div>
  );
};

export default LikeButton;

// 값 변경 필요하면 이렇게 임포트하세요
// import LikeButton from '@/components/common/LikeButton';

// <LikeButton
//   initialCount={2}
//   initialLiked={false}
//   filledHeartSrc="/icons/heart-filled.svg"
//   emptyHeartSrc="/icons/heart-empty.svg"
// />
