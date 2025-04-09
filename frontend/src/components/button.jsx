// button.jsx
import React from "react";
import "@/assets/css/index.css";

function Button({
    type = "default",
    buttonName = "Button", 
    onClick, 
    aria = "아리아를 입력하세요",
    disabled = false,
}) {
    return (
        <button
            aria-label={aria}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${type}`.trim()}
        >
            {buttonName}
        </button>
    );
}


export default Button;