import React from 'react';

const SettingSection = ({ items = [] }) => {
  return (
    <div className="setting-section">
      {items.map((item, idx) => (
        <div
          key={idx}
          className="setting-item"
          onClick={!item.rightText && item.onClick ? item.onClick : undefined}
        >
          <span className="setting-label">{item.label}</span>
          <span className="setting-right">
            {item.rightText ? (
              <span className="setting-value">{item.rightText}</span>
            ) : (
              <img src="/icons/arrow-right-gray.svg" alt=">" />
            )}
          </span>
        </div>
      ))}
    </div>
  );
};

export default SettingSection;
