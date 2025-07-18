import React, { useState } from 'react';

const Input = ({
  label,
  name,
  placeholder = '입력하세요',
  required = false,
  maxLength = 30,
  className = '',
  icon = null,
  ...rest
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const [hasText, setHasText] = useState(false);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasText(!!e.target.value.trim());
  };

  let stateClass = 'empty';
  if (isFocused) stateClass = 'focused';
  else if (hasText) stateClass = 'filled';

  return (
    <div className={`input-wrapper ${className}`}>
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
      </label>
      <div className="input-inner">
        {icon && <span className="input-icon">{icon}</span>}
        <input
          {...rest}
          name={name}
          id={name}
          required={required}
          maxLength={maxLength}
          placeholder={placeholder}
          onFocus={handleFocus}
          onBlur={handleBlur}
          className={`input-field ${stateClass}`}
        />
      </div>
    </div>
  );
};

export default Input;

// 아이콘 넣어서 쓰는 법
// import arrowIcon from "/icons/arrow-right.svg";

// <Input
//   label="다음"
//   name="next"
//   icon={<img src={arrowIcon} alt="화살표" className="svg-icon" />}
// />
