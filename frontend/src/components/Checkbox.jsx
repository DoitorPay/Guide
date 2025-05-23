import React from 'react';
import '@/assets/css/components/checkbox.scss';

const Checkbox = ({ checked = false, disabled = false, onChange = () => {} }) => {
    const handleClick = () => {
      if (disabled) return;
      onChange(!checked);
    };
  
    return (
      <div
        className={`checkbox ${checked ? 'checked' : ''} ${disabled ? 'disabled' : ''}`}
        onClick={handleClick}
      >
        {checked && (
          <img src="/icons/done.svg" alt="check" className="check-icon" />
        )}
      </div>
    );
  };
  
  export default Checkbox;