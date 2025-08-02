import React, { useEffect, useState } from 'react';

const TopicSelect = ({
  label = '스터디 주제',
  name,
  className = '',
  onClick,
  mode, // Add mode prop
}) => {
  const [currentTopicList, setCurrentTopicList] = useState('');

  useEffect(() => {
    const fetchUserTopics = async () => {
      try {
        const localStorageKey = mode === 'penalty-topic' ? 'penaltyTopics' :
                                mode === 'group-topic' ? 'groupTopics' :
                                'userTopics';

        const storedTopics = localStorage.getItem(localStorageKey);
        if (storedTopics) {
          const parsedTopics = JSON.parse(storedTopics);
          setCurrentTopicList(Array.isArray(parsedTopics) ? parsedTopics.join(', ') : parsedTopics);
          return;
        }

        const endpoint =
          mode === 'penalty-topic' ? '/api/group/punish-select' :
          mode === 'group-topic' ? '/api/group/topics' : // Assuming a new endpoint for group topics
          '/api/user/topics';

        const response = await fetch(`http://localhost:8000${endpoint}`);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        console.log('Fetched user topics data:', data);
        console.log('Type of fetched data.topics:', typeof data.topics, ', value:', data.topics);
        if (data && data[0] && Array.isArray(data[0])) {
          setCurrentTopicList(data[0].join(', '));
          localStorage.setItem(localStorageKey, JSON.stringify(data[0]));
        } else if (data && typeof data === 'string') { // For single string topic
          setCurrentTopicList(data);
          localStorage.setItem(localStorageKey, JSON.stringify([data]));
        }
      } catch (error) {
        console.error('Error fetching user topics:', error);
        setCurrentTopicList('스터디 주제를 불러올 수 없습니다.');
      }
    };

    fetchUserTopics();
  }, [mode]);

  return (
    <div className={`topic-select-wrapper ${className}`}>
      <label htmlFor={name} className="topic-label">
        {label}
      </label>
      <div className="topic-inner" onClick={onClick}>
        <p className="topic-inner__list">{currentTopicList}</p>
        <img src="/icons/arrow-right-gray.svg"/>
      </div>
    </div>
  );
};

export default TopicSelect;

// 아이콘 넣어서 쓰는 법
// import arrowIcon from "/icons/arrow-right.svg";

// <Input
//   label="다음"
//   name="next"
//   icon={<img src={arrowIcon} alt="화살표" className="svg-icon" />}
// />
