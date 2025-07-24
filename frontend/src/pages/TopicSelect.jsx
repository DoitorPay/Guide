import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagList from '@/components/tag/tagList';
import Button from '@/components/button/Button';
import SignupLayout from '@/pages/signupLayout';
import SubTitle from '@/components/subtitle/SubTitle';

// Topic mode = 'signup', 'profile', 'penalty-topic', 'group-topic' -> route에서 mode에 따라 다르게 렌더링
// 'signup' : 회원가입 시 스터디 주제 선택
// 'profile' : 프로필 수정 시 스터디 주제 선택
// 'penalty-topic' : 벌칙 주제 선택
// 'group-topic' : 그룹 생성, 그룹 정보 수정 시 스터디 주제 선택

const TopicSelect = ({ mode }) => {
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
    mode === 'profile' ? '변경하기' : '선택완료';

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


  const handleSubmit = async () => {

    if (!isValid) return alert('주제를 1개 이상 선택해주세요.');

    const endpoint =
      mode === 'signup' ? '/user/topics' :
      mode === 'penalty-topic' ? '/penalty/topics' :
      '/user/update-topics';

    try {
      const res = await fetch(`http://localhost:8000${endpoint}`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ topics: selectedTopics })
      });

      if (!res.ok) throw new Error();
      const data = await res.json();
      console.log('성공:', data);
    } catch (e) {
      alert('전송 실패');
    }
  };

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
          <TagList tags={TOPICS} onChange={setSelectedTopics} />
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
    </SignupLayout>
  );
};

export default TopicSelect;
