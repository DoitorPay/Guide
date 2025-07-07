import React from 'react';

const Popup = (
    whatIcon,
    title,
    subtitle,
    buttonName,
    onClick,
) => {
    return (
        <div className="popup">
            <div className="popup__container">
            <img src={`/icons/${whatIcon}.svg`} />
            
            </div>
            <div className="popup__overlay"></div>
        </div>
    )
}