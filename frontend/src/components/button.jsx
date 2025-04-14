// button.jsx
import React from "react";

function Button({
    type = "default",
    buttonName = "Button", 
    onClick, 
    aria = "아리아를 입력하세요",
    disabled = false,
}) {
    // if (type === "secondary") {
    //     return (
    //         <div className="btn-secondary">
    //             <button
    //                 aria-label={aria}
    //                 onClick={onClick}
    //                 disabled={disabled}
    //                 className="btn btn-secondary__item"
    //             >
    //                 {buttonName} 1
    //             </button>
    //             <button
    //                 aria-label={aria}
    //                 onClick={onClick}
    //                 disabled={disabled}
    //                 className="btn btn-secondary__item"
    //             >
    //                 {buttonName} 2
    //             </button>
    //         </div>
    //     );
    // }

    return (
        <button
            aria-label={aria}
            aria-hidden={disabled}
            onClick={onClick}
            disabled={disabled}
            className={`btn btn-${type}`.trim()}
        >
            {buttonName}
        </button>
    );
}


export default Button;