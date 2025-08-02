import React from 'react';

const PunishmentContent =  ({
    title = '엉덩이로 이름 쓰기',
    content = '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용',
    groupName = '토익 뿌수자 그룹',
    deadline = '2025.04.21',
    description = '내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용내용..'
  }) => {
    return (
      <div className="punishment-card">
        <h3 className="punishment-card__title">{title}</h3>
        <p className="punishment-card__content">{content}</p>
        <div className="punishment-card__info">
          <div className="info-row">
            <span className="info-label">그룹</span>
            <span className="info-value">{groupName}</span>
          </div>
          <div className="info-row">
            <span className="info-label">벌칙 수행일</span>
            <span className="info-value">{deadline}</span>
          </div>
        </div>
      </div>
    );
  };
  

export default PunishmentContent;
