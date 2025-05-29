// src/components/Input.jsx
import React, { useState } from 'react';

const Input = ({
  label = 'textfield',
  name,
  placeholder = '입력하세요',
  required = false,
  maxLength = 30,
  className = '',
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
        {label}{required && <span style={{ color: 'red' }}> *</span>}
      </label>
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
  );
};

export default Input;
