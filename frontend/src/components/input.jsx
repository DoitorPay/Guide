import React, { useState, useRef } from 'react';

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
  const inputRef = useRef(null);

  const handleFocus = () => setIsFocused(true);
  const handleBlur = (e) => {
    setIsFocused(false);
    setHasText(!!e.target.value.trim());
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      const form = e.target.form;
      const index = Array.prototype.indexOf.call(form, e.target);
      const nextElement = form.elements[index + 1];
      if (nextElement) {
        nextElement.focus();
      } else {
        e.target.blur();
      }
    }
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
        ref={inputRef}
        required={required}
        maxLength={maxLength}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        onKeyDown={handleKeyDown}
        className={`input-field ${stateClass}`}
      />
    </div>
  );
};

export default Input;
