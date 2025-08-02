import React, { useEffect, useState } from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import { useNavigate } from 'react-router-dom';


const HomeProfile = ({ avatar }) => {
  const [nickname, setNickname] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchNickname = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/user/nickname', { credentials: 'include' });
        const data = await res.json();
        setNickname(data.profile);
      } catch (error) {
        console.error('닉네임 불러오기 실패:', error);
        setNickname('사용자');
      }
    };

    fetchNickname();
  }, []);

  return (
    <div className="home-profile">
      <div className="home-profile-text">
        <p>오늘 큰 전진입니다 {nickname}님!</p>
        <p>계속하세요!</p>
      </div>
      <div className="home-profile-avatar" onClick={() => navigate('/mypage')} style={{cursor: 'pointer'}}>
        <ProfileImage src={avatar} alt={`${nickname}님의 프로필`} size={68} />
      </div>
    </div>
  );
};

export default HomeProfile;
