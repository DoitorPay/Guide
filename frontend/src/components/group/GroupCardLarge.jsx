import React from 'react';
import SubTitle from '@/components/subtitle/subTitle';
import ProfileImage from '@/components/profile/ProfileImage';

const GroupCardLarge = ({
  thumbnailUrl = 'https://picsum.photos/400/300',
  title = '토익 뽀개기 그룹',
  category = '토익, 공부',
  period = '2025.04.17 ~ 2025.06.17',
  members = 8,
  progress = 50,
  dueDate = '5월 20일',
  avatarList = [], 
}) => {
  return (
    <div className="group-card">
      <div className="info-wrapper">
        <div className="header">
          <div className="group-title">{title}</div>
          <button className="arrow-button" aria-label="그룹 상세보기 이동">
            <SubTitle type="link" link="/" linkIcon="arrow-right" more=" " />
          </button>
        </div>

        <div className="member-preview">
          {avatarList.slice(0, 3).map((src, i) => (
            <ProfileImage key={i} src={src} size={24} className="avatar" />
          ))}
          {members > 3 && <span className="extra-member">+{members - 3}</span>}
          <span className="member-text">멤버 {members}명</span>
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

      <div className="thumbnail-wrapper">
        <img src={thumbnailUrl} alt={`${title} 썸네일`} className="thumbnail" />
        <div className="mission-overlay">
          <div className="mission-item">
            <span className="label">미션 진행율</span>
            <span className="value">{progress}%</span>
          </div>
          <div className="mission-item">
            <span className="label">미션 마감일</span>
            <span className="value">{dueDate}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupCardLarge;
