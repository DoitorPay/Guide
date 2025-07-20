import React from 'react';
import UserProfileRow from '@/components/profile/UserProfileRow';
import SubTitle from '@/components/subtitle/SubTitle';

const getRankedList = (list) => {
  const sorted = [...list].sort((a, b) => b.progress - a.progress);

  const ranked = [];
  let currentRank = 1;

  for (let i = 0; i < sorted.length; i++) {
    if (i > 0 && sorted[i].progress === sorted[i - 1].progress) {
      // 동점이면 동일 순위
      ranked.push({ ...sorted[i], rank: ranked[i - 1].rank });
    } else {
      ranked.push({ ...sorted[i], rank: i + 1 });
    }
  }

  return ranked;
};

const RankingList = ({ rankings = [] }) => {
  const rankedList = getRankedList(rankings);

  return (
    <div className="ranking-list card">
      <h3 className="ranking-title">랭킹</h3>
      <ul className="ranking-items">
        {rankedList.map((user, index) => (
          <li key={index} className="ranking-item">
            <span className="ranking-number">{user.rank}</span>
            <UserProfileRow name={user.name} variant="horizontal" size={50} border />
            <span className="ranking-progress">
              {user.progress}%
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RankingList;
