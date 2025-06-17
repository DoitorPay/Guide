import React, { useState } from 'react';
import Button from '@/components/Button';

const TOPICS = [
  '수능 공부', '과제', '디자인', '코딩', '토익',
  '오픽', '토플', '리트', '자격증', '취준', '자기계발', '독서', 'adafsdfa'
];

const StudyTopic = () => {
  const [selectedTopics, setSelectedTopics] = useState([]);

  const toggleTopic = (topic) => {
    setSelectedTopics((prev) =>
      prev.includes(topic)
        ? prev.filter((t) => t !== topic)
        : [...prev, topic]
    );
  };

  
  const isSelected = (topic) => selectedTopics.includes(topic);

  const handleSubmit = async () => {
  try {
    const kakaoId = localStorage.getItem('kakao_id');

    const response = await fetch('http://localhost:8000/user/topics', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        kakao_id: kakaoId,
        topics: selectedTopics,
      }),
    });

    if (!response.ok) throw new Error('전송 실패');
    const data = await response.json();

    console.log('주제 저장 완료:', data);
    // TODO: 홈 화면이나 메인 서비스 페이지로 이동
  } catch (err) {
    console.error('주제 전송 중 오류:', err);
    alert('주제 저장 중 문제가 발생했습니다.');
  }
};


  return (
    <div className="signup-wrapper">
      <h3 style={{ fontWeight: 'bold' }}>
        원하는 스터디 주제를 1개 이상 선택해주세요.
      </h3>
      <p style={{ color: '#aaa', fontSize: '14px' }}>추후 변경 가능하다는 말</p>

      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px', marginTop: '16px' }}>
        {TOPICS.map((topic) => (
          <button
            key={topic}
            type="button"
            onClick={() => toggleTopic(topic)}
            className={`topic-chip ${isSelected(topic) ? 'active' : ''}`}
            style={{
              padding: '12px 20px',
              borderRadius: '20px',
              border: `1px solid ${isSelected(topic) ? '#F05A39' : '#ccc'}`,
              background: isSelected(topic) ? '#FEEFEB' : '#fff',
              color: isSelected(topic) ? '#333' : '#333',
              cursor: 'pointer',
              fontWeight: "600"
            }}
          >
            {topic}
          </button>
        ))}
      </div>

      <div style={{ marginTop: '40px', textAlign: 'center' }}>
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
