import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import TagList from '@/components/tag/tagList';
import Button from '@/components/button/Button';
import SignupLayout from '@/pages/signupLayout';
import SubTitle from '@/components/subtitle/SubTitle';
import Popup from '@/components/popupModal/popup';

// Topic mode = 'signup', 'profile', 'penalty-topic', 'group-topic' -> route에서 mode에 따라 다르게 렌더링
// 'signup' : 회원가입 시 스터디 주제 선택
// 'profile' : 프로필 수정 시 스터디 주제 선택
// 'penalty-topic' : 벌칙 주제 선택
// 'group-topic' : 그룹 생성, 그룹 정보 수정 시 스터디 주제 선택

const TopicSelect = ({ mode }) => {
  const navigate = useNavigate();

  const [selectedTopics, setSelectedTopics] = useState([]);

  const studyTopics = [
    '수능 공부', '과제', '디자인', '코딩', '토익',
    '오픽', '토플', '리트', '자격증', '취준', '자기계발', '독서', '기타'
  ];

  const penaltyTopics = [
    '애교 3종 세트', '3행시 짓기', '카메라 보고 윙크',
    '작은 간식 쏘기', '노래 부르기', '춤추기', '웃음 참기', '기타 벌칙'
  ];

  const TOPICS = mode === 'penalty-topic' ? penaltyTopics : studyTopics;

  const buttonText =
    mode === 'signup' ? '딱!대 시작하기' :
    mode === 'profile' ? '변경하기' :
    mode === 'study-topic' ? '변경하기' : // 'study-topic' 모드 추가
    '선택완료';

  const subtitleText =
  mode === 'penalty-topic'
    ? '원하는 벌칙 주제를 3개 이상 선택해주세요.'
    : mode === 'group-topic'
      ? '원하는 스터디 주제를 1개 선택해주세요.'
      : '원하는 스터디 주제를 3개 이상 선택해주세요.';


  const isValid =
  mode === 'penalty-topic' ? selectedTopics.length >= 3 :
  mode === 'group-topic' ? selectedTopics.length >= 1 :
  selectedTopics.length >= 3;


  // 기존 리스트 불러오기
  const endpoint =
  mode === 'profile-topic' ? '/api/user/topics' :
  '/api/user/topics';
  
  useEffect(() => {
    const fetchUserTopics = async () => {
        try {
          const localStorageKey = mode === 'penalty-topic' ? 'penaltyTopics' :
                                  mode === 'group-topic' ? 'groupTopics' :
                                  'userTopics';

          const storedTopics = localStorage.getItem(localStorageKey);
          if (storedTopics) {
            setSelectedTopics(JSON.parse(storedTopics));
            return;
          }

          // 벌칙 주제 또는 그룹 주제 모드일 경우, 로컬 스토리지에 없으면 초기 선택 없이 바로 반환
          if (mode === 'penalty-topic' || mode === 'group-topic') {
            return; // setSelectedTopics는 초기 useState([])에 의해 빈 배열로 유지됨
          }

          const response = await fetch(`http://localhost:8000${endpoint}`, {
            credentials: "include",
          });
          if (!response.ok) {
            throw new Error('Failed to fetch user topics');
          }
          const data = await response.json();
          console.log('GET 요청 데이터:', data);
          if (data && Array.isArray(data) && data.length > 0 && Array.isArray(data[0])) {
            console.log(data.topics)
            console.log('설정될 토픽:', data[0]);
            setSelectedTopics(data[0]);
            localStorage.setItem(localStorageKey, JSON.stringify(data[0]));
          }
        } catch (error) {
          console.error('주제 불러오기 실패:', error);
        }
    };

    fetchUserTopics();
  }, [mode]);

  

  const handleSubmit = async () => {

    if (!isValid) return alert('주제를 1개 이상 선택해주세요.');

    const localStorageKey =
      mode === 'penalty-topic' ? 'penaltyTopics' :
      mode === 'group-topic' ? 'groupTopics' :
      'userTopics';

    if (mode === 'penalty-topic' || mode === 'group-topic') {
      localStorage.setItem(localStorageKey, JSON.stringify(selectedTopics));
      setSetPopup(true); // 성공 팝업을 띄우기 위해
      // navigate(-1); // 팝업 확인 버튼으로 이동하므로 바로 이동하지 않음
      return;
    }

    const endpoint =
      mode === 'signup' ? '/api/user/topics' :
      mode === 'penalty-topic' ? '/api/penalty/topics' :
      '/api/user/topics';

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: selectedTopics })
      });

      if(!res.ok) throw new Error();
      const data = await res.json();
      console.log('성공:', data);
      localStorage.setItem(
        localStorageKey,
        JSON.stringify(selectedTopics)
      );
      if (mode === 'signup') { // 회원가입일 때 메인으로 이동
        navigate('/main');
      } else { 
        setSetPopup(true);
      }
    } catch (e) {
      console.error('전송 실패:', e);
      alert('전송 실패');
    }
  };


  const [setPopup, setSetPopup] = useState(false);

  
  return (
    <SignupLayout
      headerProps={{
        type: "header-b",
         title: mode === 'penalty-topic' ? '벌칙 주제' : '스터디 주제',
        icon1OnClick: () => navigate(-1)
      }}
    >
      <div className="study-topic-wrapper">
        <div className="study-topic-body">
          <SubTitle title={subtitleText} desc="추후 변경 가능합니다." type='desc'/>
          <TagList tags={TOPICS} onChange={setSelectedTopics} value={selectedTopics} />
        </div>
        <div className="study-topic-footer">
          <Button
            type="primary"
            buttonName={buttonText}
            disabled={!isValid}
            onClick={handleSubmit}
          />
        </div>
      </div>
      <Popup
        icon="done-gray"
        title="성공적으로 반영되었습니다."
        buttonName="확인"
        onClick={() => navigate(-1)}
        setPopup={setPopup}
      />
    </SignupLayout>
  );
};

export default TopicSelect;
