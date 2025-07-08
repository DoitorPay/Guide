import React from 'react';

const LevelProgress = ({ level = 5, current = 660, total = 2530 }) => {
  const percent = Math.min((current / total) * 100, 100);

  return (
    <div className="level-progress">
      <div className="level-progress__header">
        <span className="level-progress__level">Level {level}</span>
        <span className="level-progress__score">
          {current}/{total}
        </span>
      </div>
      <div className="level-progress__bar">
        <div
          className="level-progress__bar-fill"
          style={{ width: `${percent}%` }}
        ></div>
      </div>
    </div>
  );
};

export default LevelProgress;
