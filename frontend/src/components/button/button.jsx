import React from "react";

function Button({
  type = "default",
  buttonName = "Button",
  onClick,
  aria = "아리아를 입력하세요",
  disabled = false,
  bgColor,     
  textColor,     
  htmlType = "button", // html type prop 추가
}) {
  const customStyle = {
    backgroundColor: bgColor,
    color: textColor,
  };

  if (type === "close") {
    return (
      <button
        type={htmlType} // htmlType을 적용
        aria-label="닫기"
        aria-hidden={disabled}
        onClick={onClick}
        disabled={disabled}
        className="btn btn-close"
        style={bgColor || textColor ? customStyle : undefined}
      >
        닫기
      </button>
    );
  }

  return (
    <button
      type={htmlType} // htmlType을 적용
      aria-label={aria}
      aria-hidden={disabled}
      onClick={onClick}
      disabled={disabled}
      className={`btn btn-${type}`.trim()}
      style={bgColor || textColor ? customStyle : undefined}
    >
      {buttonName}
    </button>
  );
}

export default Button;
