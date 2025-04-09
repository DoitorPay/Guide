// button.jsx
import React from "react";
import "@/assets/css/index.css";

function Button({ 
    buttonName = "Button", 
    onClick, 
    type = "default",
    aria = "아리아를 입력하세요",
    disabled = false,
    isLoading = false,
}) {
    return (
        <button
            aria-label={aria}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`btn-${type}`.trim()}
        >
            {buttonName}
        </button>
    );
}


export default Button;