import React from 'react';
import { useNavigate } from 'react-router-dom';

const SettingSection = ({ items = [] }) => {
  const navigate = useNavigate();

  return (
    <div className="setting-section">
      {items.map((item, index) => {
        const {
          label,
          type = 'default', 
          text,
          icon = '/icons/arrow-right.svg',
          onClick,
          to,
        } = item;

        const handleClick = () => {
          if (type === 'text') return;
          if (to) navigate(to);
          else if (onClick) onClick();
        };

        return (
          <div
            key={index}
            className={`setting-item ${
              type === 'text' ? 'has-text' : ''
            } ${type === 'none' ? 'no-right' : ''}`}
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
