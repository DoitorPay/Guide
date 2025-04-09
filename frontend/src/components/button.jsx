// button.jsx
import React from "react";
import "@/assets/css/index.css";

function Button({ 
    buttonName = "Button", 
    onClick, 
    type = "button",
    aria = "아리아를 입력하세요",
    disabled = false,
    isLoading = false,
    addClass = "btn-wrap",
}) {
    return (
        <button
            type={type}
            aria-label={aria}
            onClick={onClick}
            disabled={disabled || isLoading}
            className={`${isLoading ? "loading" : ""} ${addClass ? addClass : ""}`.trim()}
        >
            {isLoading ? "Loading..." : buttonName}
        </button>
    );
}


export default Button;