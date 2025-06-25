import React from 'react';

const GroupCard = ({
  thumbnailUrl = 'https://picsum.photos/400/300',
  title = '토익 뽀개기 그룹',
  category = '토익, 공부',
  period = '2025.04.17 ~ 2025.06.17'
}) => {
  return (
    <div className="group-card">
      <div className="thumbnail-wrapper">
        <img src={thumbnailUrl} alt={`${title} 썸네일`} className="thumbnail" />
      </div>

      <div className="info-wrapper">
        <h3 className="group-title">{title}</h3>
        <div className="group-meta">
          <span className="label">카테고리 | </span>
          <span className="value">{category}</span>
        </div>
        <div className="group-meta">
          <span className="label">그룹 기간 | </span>
          <span className="value">{period}</span>
        </div>
      </div>

      <button className="arrow-button" aria-label="그룹 상세보기 이동">버튼svg작업</button>
    </div>
  );
};

export default GroupCard;
