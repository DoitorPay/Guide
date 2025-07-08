import React, { useState } from 'react';

const GroupFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFab = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fab-container">
      {isOpen && (
        <div className="fab-menu">
          <button className="fab-menu-item">그룹 생성</button>
          <button className="fab-menu-item">그룹 찾기</button>
        </div>
      )}

      <button className="fab-button" onClick={toggleFab}>
        <img
          src={isOpen ? '/icons/clear.svg' : '/icons/add.svg'}
          alt={isOpen ? '닫기 버튼' : '열기 버튼'}
        />
      </button>
    </div>
  );
};

export default GroupFloatingButton;
