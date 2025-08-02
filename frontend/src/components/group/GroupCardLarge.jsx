import React from 'react';
import SubTitle from '@/components/subtitle/subTitle';
import ProfileImage from '@/components/profile/ProfileImage';

const GroupCardLarge = ({
  isFinished = false,
  thumbnailUrl = 'https://picsum.photos/400/300',
  title = '토익 뽀개기 그룹',
  category = '토익, 공부',
  period = '2025.04.17 ~ 2025.06.17',
  members = 8,
  progress = 50,
  dueDate = '5월 20일',
  avatarList = [
    'https://i.pravatar.cc/24?img=1',
    'https://i.pravatar.cc/24?img=2',
    'https://i.pravatar.cc/24?img=3',
  ],
  onClick,
}) => {
  const avatarToShow = avatarList.slice(0, 3);
  const extraCount = members - avatarToShow.length;

  return (
    <div className="group-card">
      {isFinished && <div className="finished-overlay" aria-hidden="true" />}
      <div className="info-wrapper">
        <div className="text-wrapper">
          <div className="group-title">{title}</div>
          <button className="arrow-button" aria-label="그룹 상세보기 이동" onClick={onClick}>
            <SubTitle type="link" link="/" linkIcon="arrow-right-white" more=" " />
          </button>
        </div>

        <div className="member-preview">
          {avatarToShow.map((src, i) => (
            <ProfileImage key={i} src={src} size={26} className="avatar" />
          ))}
          {extraCount > 0 && <div className="extra-avatar">+{extraCount}</div>}
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
    </div>
  );
};

export default GroupCardLarge;
