import React from 'react';
import { useNavigate } from 'react-router-dom';
import useProfileStore from '@/stores/useProfileStore';

const SettingSection = ({ items = [] }) => {
  const navigate = useNavigate();
  const logoutStore = useProfileStore((state) => state.logout);

  const handleLogout = async () => {
    try {
      const res = await fetch('http://localhost:8000/auth/logout', {
        method: 'GET',
        credentials: 'include',
      });
      if (res.ok) {
        logoutStore();           
        navigate('/login');        
      } else {
        alert('로그아웃 실패!');
      }
    } catch (err) {
      console.error('로그아웃 오류:', err);
      alert('서버 오류 ^^');
    }
  };

  return (
    <div className="setting-section">
      {items.map((item, index) => {
        const { label, type = 'default', text, icon = '/icons/arrow-right.svg', onClick, to } = item;

        const handleClick = () => {
          if (label === '로그아웃') return handleLogout(); 
          if (type === 'text') return;
          if (to) navigate(to);
          else if (onClick) onClick();
        };

        return (
          <div
            key={index}
            className={`setting-item ${type === 'text' ? 'has-text' : ''} ${type === 'none' ? 'no-right' : ''}`}
            onClick={handleClick}
          >
            <span>{label}</span>
            <div className="setting-item__right">
              {type === 'text' && <span className="setting-item__text">{text}</span>}
              {type === 'default' && <img src={icon} alt="arrow" />}
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SettingSection;
