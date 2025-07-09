import React from "react";

const MoreOption = ({
    title = "타이틀",
    subtitle = "서브타이틀",
}) => {
    
    return(
        <div className="more-option">
            <div className="more-option__container">
                <div className="more-title">{title}</div>
                <div className="more-subtitle">
                <div className="more-subtitle--list">{subtitle}</div>
                <div className="more-subtitle--list">{subtitle}</div>
                <div className="more-subtitle--list">{subtitle}</div>
                <div className="more-subtitle--list">{subtitle}</div>
                <div className="more-subtitle--list">{subtitle}</div>
                <div className="more-subtitle--list">{subtitle}</div>
                </div>
            </div>

            <div className="overlay"></div>
        </div>

    )
}

export default MoreOption;