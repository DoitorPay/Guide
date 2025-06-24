// header.jsx
import React, { useState, useEffect } from "react";

function Header({
    type = "default",
    icon1 = "center-focus-strong",
    icon2 = "center-focus-strong",
    icon1OnClick,
    icon2OnClick,
    title,
}) {
    const [pageTitle, setPageTitle] = useState(title || "Title");
    
    useEffect(() => {
        if (title) {
            setPageTitle(title);
            return;
        }
        
        setPageTitle(document.title || "Title");
        
        const observer = new MutationObserver(() => {
            if (!title) {
                setPageTitle(document.title || "Title");
            }
        });
        
        observer.observe(document.querySelector('title'), {
            subtree: true,
            characterData: true,
            childList: true
        });
    }, [title]);

    return (
        <header className="cmp-header">
            <nav>
                {/* 좌측 영역 */}
                {type === "default" && (
                    <div className="logo">
                        <a href="#"><img src="/src/assets/image/common/logo.png" alt="" /></a>
                    </div>
                )}
                
                {type === "header-a" && (
                    <div className="logo">
                        <span className="logo__title">{pageTitle}</span>
                    </div>
                )}
                
                {type === "header-b" && (
                    <div className="mid-title">
                        <div className="back-button">
                            <i onClick={icon1OnClick} className="ico" style={{background: 'url(/icons/arrow-left.svg) no-repeat center center'}}></i>
                        </div>
                    </div>
                )}

                {/* 중앙 영역 */}
                {type === "header-b" && (
                    <div className="back">
                        <span className="logo__title">{pageTitle}</span>
                    </div>
                )}

                {/* 우측 영역 */}
                {(type === "default" || type === "header-a") && (
                    <div className="menu">
                        <ul className="menu__list">
                            <li><i onClick={icon1OnClick} className="ico" style={{background: `url(/icons/${icon1}.svg) no-repeat center center`}}></i></li>
                            {type === "header-a" && (
                                <li><i onClick={icon2OnClick} className="ico" style={{background: `url(/icons/${icon2}.svg) no-repeat center center`}}></i></li>
                            )}
                        </ul>
                    </div>
                )}
                
                {type === "header-b" && (
                    <div className="menu">
                        <i onClick={icon1OnClick} className="ico" style={{background: `url(/icons/${icon1}.svg) no-repeat center center`}}></i>
                    </div>
                )}
            </nav>
        </header>
    );
}

export default Header;