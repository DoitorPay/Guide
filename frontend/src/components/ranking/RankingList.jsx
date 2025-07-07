import React from 'react';
import UserProfileRow from '@/components/profile/UserProfileRow';

const RankingList = ({ rankings = [] }) => {
  return (
    <div className="ranking-list card">
      <h3 className="ranking-title">랭킹</h3>
      <ul className="ranking-items">
        {rankings.map((user, index) => (
          <li key={index} className="ranking-item">
            <span className="ranking-number">{index + 1}</span>
            <UserProfileRow name={user.name} variant="horizontal" size={40} />
            <span className="ranking-progress" style={{ color: '#FF5A5A' }}>
              {user.progress}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
