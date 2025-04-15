// src/components/Input.jsx
import React, { useState } from 'react';

const Input = ({
  label = 'textfield',
  name,
  placeholder = '입력하세요',
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
        {label}
      </label>
      <input
        {...rest}
        name={name}
        id={name}
        placeholder={placeholder}
        onFocus={handleFocus}
        onBlur={handleBlur}
        className={`input-field ${stateClass}`}
      />
    </div>
  );
};

export default Input;


// 사용 예시
// const ㅁㄴㅇㄹ = () => {
//    return (
//      <div>
//        <Input
//          label="이름"
//          name="username"
//          placeholder="이름을 입력하세요"
//        />
//      </div>
//    );
//  };
 
