import React from 'react';

const HistoryCard = ({
  image,
  isCertified,
  title = '엉덩이로 이름 쓰기',
  groupName = '토익 뿌수자 그룹',
  deadline = '2000.11.11',
  onClick,
}) => {
  const cardClass = `historycard ${!isCertified ? 'clickable' : ''}`;

  return (
    <div className={cardClass} onClick={onClick}>
      <div className={`historycard__image-box ${image ? 'has-image' : ''}`}>
        {image ? (
          <img src={image} alt="인증 이미지" className="historycard__image" />
        ) : (
          <div className="historycard__upload-box">
            <img src="/icons/upload.svg" alt="업로드 아이콘" />
            <span className="upload-text">업로드</span>
          </div>
        )}
      </div>

      <div className="historycard__info">
        <span className={`historycard__badge ${isCertified ? 'certified' : 'uncertified'}`}>
          {isCertified ? '인증' : '미인증'}
        </span>
        <p className="historycard__title">{title}</p>
        <div className="historycard__meta">
          <span className="label">그룹</span>
          <span className="value">{groupName}</span>
        </div>
        <div className="historycard__meta">
          <span className="label">마감 날짜</span>
          <span className="value">{deadline}</span>
        </div>
      </div>
    </div>
  );
};

export default HistoryCard;
