import React from "react";

const MoreOption = ({
    title = "타이틀",
    options = [],
    isOpen = false,
}) => {
    let clickOverlay = isOpen;
    function closeModal() {
        clickOverlay = false;
    }

    return(
        <>
            { isOpen && (
                <div className="more-option">
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
                    <div className="overlay" onClick={closeModal()}></div>
                </div>
            )}
        </>
    )
}

export default MoreOption;