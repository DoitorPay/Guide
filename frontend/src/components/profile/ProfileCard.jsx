import React, { useState, useEffect } from 'react';
import ProfileImage from '@/components/profile/ProfileImage';
import ProfileName from '@/components/profile/ProfileName';


const ProfileCard = ({ onClick }) => {
  const [nickname, setNickname] = useState('로딩 중...');

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

      const [quote, setQuote] = useState('');
      useEffect(() => {
          const fetchQuote = async() => {
              try {
                  const response = await fetch("http://localhost:8000/user/user_properties", {
                      credentials: "include",
                      });
                  if (!response.ok) {
                      throw new Error(`오류!: ${response.status}`);
                  }
                  const jsonData = await response.json();
                  console.log("----- GET 데이터 -----");
                  console.log(JSON.stringify(jsonData, null, 2));
                  console.log("-------------------");
                  setQuote(jsonData[0].quote || '');
              } catch(error) {
                  console.error('상태메시지 불러오기 실패:', error);
                  setQuote('상태메시지를 불러올 수 없습니다.')
              }
          };
  
          fetchQuote();
      }, []);

  return (
    <div className="profile-card" onClick={onClick}>
      <ProfileImage size={100} className="profile-card__image" />
      <div className="profile-card__info">
        <ProfileName name={nickname} size="md" />
        <span className="profile-card__status">{quote}</span>
      </div>
      <img
        src="/icons/arrow-right-orange.svg"
        alt="arrow"
        className="profile-card__arrow"
      />
    </div>
  );
};

export default ProfileCard;
///