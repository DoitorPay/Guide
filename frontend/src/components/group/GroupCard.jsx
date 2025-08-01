import React from 'react';
import SubTitle from '@/components/subtitle/subTitle';

const GroupCard = ({
  thumbnailUrl = 'https://picsum.photos/400/300',
  title = '토익 뽀개기 그룹',
  category = '토익, 공부',
  period = '2025.04.17 ~ 2025.06.17',
  onArrowClick,
  isFinished = false
}) => {
  return (
    <div className={`group-card ${isFinished ? 'disabled' : ''}`}>
      {isFinished && <div className="finished-overlay" aria-hidden="true" />}
      <div className="info-wrapper">
        <div className="thumbnail-wrapper">
          <img src={thumbnailUrl} alt={`${title} 썸네일`} className="thumbnail" />
        </div>
        <div className="text-wrapper">
          <div className="group-title">{title}</div>
          <button
            className="arrow-button"
            aria-label="그룹 상세보기 이동"
            disabled={isFinished}
            onClick={(e) => {
              e.stopPropagation(); 
              if (!isFinished && onArrowClick) onArrowClick();
            }}
          >
            <SubTitle type="link" link="#" linkIcon="arrow-right-white" more=" " />
          </button>
        </div>
        <div className="meta-item">
          <span className="label">카테고리</span>
          <span className="value">| {category}</span>
        </div>
        <div className="meta-item">
          <span className="label">그룹 기간</span>
          <span className="value bold">| {period}</span>
        </div>
      </div>
    </div>
  );
};



export default GroupCard;