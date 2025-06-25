import React, { useState } from 'react';
import TagList from '@/components/tagList';
import Button from '@/components/Button';

const TOPICS = [
  '수능 공부', '과제', '디자인', '코딩', '토익',
  '오픽', '토플', '리트', '자격증', '취준', '자기계발', '독서', '기타'
];

const StudyTopic = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

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
    <div className="study-topic">
      <h3>
        원하는 스터디 주제를 1개 이상 선택해주세요.
      </h3>
      <p>추후 변경 가능하다는 말</p>
      <div className='topic-list'>
<TagList tags={TOPICS} onChange={setSelectedTopics} />

      </div>
      <div className="submit-button">
        <Button
          type="primary"
          buttonName="딱!대 시작하기"
          disabled={selectedTopics.length === 0}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

export default StudyTopic;
