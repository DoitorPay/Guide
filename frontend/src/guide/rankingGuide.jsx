import React from 'react';
import MyRanking from '@/components/ranking/MyRanking'; 
import RankingList from '@/components/ranking/RankingList';

const RankingGuide = () => {
 const myInfo = {
    name: '본인닉네임',
    progress: 32,
    rank: 6,
  };

  const rankings = [
    { name: '김도윤', progress: 80 },
    { name: '김도윤', progress: 77 },
    { name: '김도윤', progress: 80 },
    { name: '김도윤', progress: 80 },
    { name: '김도윤', progress: 80 },
  ];

  return (
    <div>
        <h1 style={{ fontWeight: 'bold', color: '#F05A39', fontSize: '2rem' }}>props로 받을 수 있도록 비워서 제작 아직 마크업</h1>
      <MyRanking {...myInfo} />
      <RankingList rankings={rankings} />
    </div>
  );
}
export default RankingGuide;