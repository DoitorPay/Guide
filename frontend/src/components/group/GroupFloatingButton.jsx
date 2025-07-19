import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const GroupFloatingButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleFab = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className="fab-container">
      {isOpen && (
        <div className="fab-menu">
           <Link href="/" className="fab-menu-item">그룹 생성</Link>
           <Link href="/" className="fab-menu-item">그룹 찾기</Link>
        </div>
      )}

      <button className="fab-button" onClick={toggleFab}>
        <img
          src={isOpen ? '/icons/clear-white.svg' : '/icons/add-white.svg'}
          alt={isOpen ? '닫기 버튼' : '열기 버튼'}
        />
      </button>
    </div>
  );
};

export default GroupFloatingButton;
