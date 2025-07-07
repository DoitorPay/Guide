import React from 'react';
import UserProfileRow from '@/components/profile/UserProfileRow';

const MyRanking = ({ name, progress, rank }) => {
  return (
    <div className="my-ranking card">
      <UserProfileRow name={name} variant="horizontal" size={50} />

      <div className="my-ranking-info">
        <span className="progress-label">진행률</span>
        <span className="progress-value">{progress}%</span>
        <span className="divider">|</span>
        <span className="rank-label">등수</span>
        <span className="rank-value">{rank}등</span>
      </div>
    </div>
  );
};

export default MyRanking;
