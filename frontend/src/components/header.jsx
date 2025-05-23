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

    if(type == "default") {
        return (
            <header className="cmp-header">
                <nav>
                    <div className="logo">
                        <a href="#"><img src="/src/assets/image/common/logo.png" alt="" /></a>
                    </div>
    
                    <div className="menu">
                        <ul className="menu__list">
                            <li><i onClick={icon1OnClick} className="ico" style={{background: `url(/icons/${icon1}.svg) no-repeat center center`}}></i></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if(type == "header-a") {
        return (
            <header className="cmp-header">
                <nav>
                    <div className="logo">
                        <span className="logo__title">{pageTitle}</span>
                    </div>
    
                    <div className="menu">
                        <ul className="menu__list">
                            <li><i onClick={icon1OnClick} className="ico" style={{background: `url(/icons/${icon1}.svg) no-repeat center center`}}></i></li>
                            <li><i onClick={icon2OnClick} className="ico" style={{background: `url(/icons/${icon2}.svg) no-repeat center center`}}></i></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if(type == "header-b") {
        return (
            <header className="cmp-header">
            <nav>
                <div className="mid-title">
                    <div className="back-button">
                        <i onClick={icon1OnClick} className="ico" style={{background: 'url(/icons/arrow-left.svg) no-repeat center center'}}></i>
                    </div>
    
                </div>
    
    
    
                <div className="back">
                    <span className="logo__title">{pageTitle}</span>
                </div>
    
                <div className="menu">
                    <i onClick={icon1OnClick} className="ico" style={{background: `url(/icons/${icon1}.svg) no-repeat center center`}}></i>
                </div>
            </nav>
        </header>
        )
    }

}

export default Header;