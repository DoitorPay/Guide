import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TagList from '@/components/tag/tagList';
import Button from '@/components/button/Button';
import SignupLayout from '@/pages/signupLayout';
import SubTitle from '@/components/subtitle/SubTitle';

const TOPICS = [
  '수능 공부', '과제', '디자인', '코딩', '토익',
  '오픽', '토플', '리트', '자격증', '취준', '자기계발', '독서', '기타'
];

const StudyTopic = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  const handleSubmit = async () => {
    try {
      const response = await fetch('http://localhost:8000/user/topics', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          topics: selectedTopics,
        }),
      });

      if (!response.ok) throw new Error('전송 실패');
      const data = await response.json();

      console.log('주제 저장 완료:', data);
    } catch (err) {
      console.error('주제 전송 중 오류:', err);
      alert('주제 저장 중 문제가 발생했습니다.');
    }
  };

  return (
    <SignupLayout
      headerProps={{
        type: "header-b",
        title: "스터디 주제",
        // icon2: "notifications",
        icon1OnClick: handleGoBack
      }}
    >

      <div className="study-topic">
        <div className="topic-description">
          <SubTitle title="원하는 스터디 주제를 1개 이상 선택해주세요." />
          <p className="subtitle">
          추후 변경 가능하다는 말
          </p>
        </div>
        <div className='topic-list'>
          <TagList tags={TOPICS} onChange={setSelectedTopics} />

        </div>
      </div>
      <div className="submit-button">
          <Button
            type="primary"
            buttonName="딱!대 시작하기"
            disabled={selectedTopics.length === 0}
            onClick={handleSubmit}
          />
        </div>
    </SignupLayout>

  );
};

export default StudyTopic;
