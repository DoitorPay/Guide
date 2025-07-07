import React from 'react';

const ProgressCard = ({ percent = 100 }) => {
  return (
    <div className="progress-card">
      <div className="progress-header">
        <img src="/icons/outlined-flag-red.svg"/>
        <span className="progress-title">오늘의 진행 상황</span>
      </div>
      <div className="progress-value">
        <span className="value">{percent}</span>
        <span className="unit">%</span>
      </div>
    </div>
  );
};

export default ProgressCard;
