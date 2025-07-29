import React from 'react';
import UserProfileRow from '@/components/profile/UserProfileRow';

const MyRanking = ({ name, progress, rank }) => {
  return (
    <div className="my-ranking card">
      <UserProfileRow name={name} variant="horizontal" size={60} border nameWeight="bold"/>

      <div className="my-ranking-info">
        <div className="info-wrapper">
          <span className="progress-label">진행율</span>
        <span className="progress-value">{progress}%</span>
        </div>
        <span className="divider">|</span>
        <div className="info-wrapper">
          <span className="rank-label">등수</span>
        <span className="rank-value">{rank}등</span>
        </div>
      </div>
    </div>
  );
};

export default MyRanking;
