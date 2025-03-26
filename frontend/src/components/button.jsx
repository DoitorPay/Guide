// button.jsx
import React from "react";
// import { Link } from "react-router-dom";
import "../assets/css/Button.scss";

function Button({ 
    buttonName = "Button", 
    onClick, 
    type = "button",
    aria = "테스트 버튼",
    disabled = false,
    isLoading = false,
    addClass = "btn-wrap",
}) {
    return (
        <div className={`cmp-button ${addClass}`}>
            <div className="cmp-button__button-wrap">
                <button
                    type={type}
                    aria-label={aria}
                    onClick={onClick}
                    disabled={disabled || isLoading}
                    className={`${isLoading ? "loading" : ""} ${addClass ? addClass : ""}`.trim()}
                >
                    {isLoading ? "Loading..." : buttonName}
                </button>
            </div>
        </div>
    );
}
// 사용 예시
{/* <Button 
    buttonName="로그인" 
    onClick={handleLogin} 
    type="submit"
    isLoading={isLoading}
    disabled={!isValid}
/> */}

export default Button;