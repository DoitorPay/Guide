import React from "react";

const MoreOption = ({
    title = "타이틀",
    options = [],
    isOpen = false,
    onClose = () => {},
}) => {
    const handleOverlayClick = (e) => {
        // overlay 자체를 클릭했을 때만 모달 닫기
        if (e.target === e.currentTarget) {
            onClose();
        }
    };
    if(!isOpen) return null;

    return(
        <div className="more-option" onClick={handleOverlayClick}>
            <div className="more-option__container">
                <div className="more-title">{title}</div>
                <div className="more-subtitle">
                    {options.map((option, index) => (
                        <div key={index} className="more-subtitle--list" onClick={option.onClick}>
                            {option.label}
                        </div>
                    ))}
                </div>
            </div>
            <div className="overlay" onClick={handleOverlayClick}></div>
        </div>
    )
}

export default MoreOption;