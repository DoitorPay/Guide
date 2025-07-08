import React from 'react';
import Button from '@/components/button/button';

const Popup = ({
    icon,
    title,
    subtitle,
    buttonName,
    button2Name,
    buttonAria,
    button2Aria,
    onClick,
    onSecondClick,
    setPopup = true,
}) => {
    return (
        <>
            {setPopup && (
                <div className="popup">
                    <div className="popup__container">
                        <img src={`/icons/${icon}.svg`} />
                        <div className="text-wrapper">
                            <p className="text-wrapper-title">{title}</p>
                            <p className="text-wrapper-subtitle">{subtitle}</p>
                        </div>
                        {
                            !button2Name && (
                                <div className="button-wrapper">
                                    <Button
                                        type="primary"
                                        buttonName={buttonName}
                                        aria={buttonAria}
                                        onClick={onClick}
                                        bgColor="var(--color-gray-scale-50)"
                                        textColor="var(--Grayscale-Gray-700)"
                                    />
                                </div>

                            )
                        }
                        {
                            button2Name && (
                                <div className="button-wrapper">
                                    <Button
                                        type="primary"
                                        buttonName={buttonName}
                                        aria={buttonAria}
                                        onClick={onClick}
                                        bgColor="var(--color-gray-scale-50)"
                                        textColor="var(--Grayscale-Gray-700)"
                                    />
                                    <Button
                                        type="primary"
                                        buttonName={button2Name}
                                        aria={button2Aria}
                                        onClick={onSecondClick}
                                    />
                                </div>
                            )
                        }
                    </div>
                    <div className="overlay"></div>
                </div>
            )}
        </>
    )
}

export default Popup;