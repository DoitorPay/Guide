// header.jsx
import React, { useState, useEffect } from "react";
import useStore from "@/store/headerStore";

function Header({
    type,
    icon1,
    icon2,
    icon1OnClick,
    icon2OnClick,
    title,
}) {
    // Zustand 스토어에서 헤더 상태와 이벤트 핸들러 가져오기
    const { 
        headerType, 
        headerIcon1, 
        headerIcon2, 
        headerTitle,
        headerIcon1OnClick, 
        headerIcon2OnClick 
    } = useStore();
    
    // props가 제공되면 props 사용, 아니면 스토어 값 사용 (하위 호환성 유지)
    const currentType = type !== undefined ? type : headerType;
    const currentIcon1 = icon1 !== undefined ? icon1 : headerIcon1;
    const currentIcon2 = icon2 !== undefined ? icon2 : headerIcon2;
    const currentIcon1OnClick = icon1OnClick || headerIcon1OnClick;
    const currentIcon2OnClick = icon2OnClick || headerIcon2OnClick;

    const [pageTitle, setPageTitle] = useState(title || headerTitle || "Title");
    
    useEffect(() => {
        if (title || headerTitle) {
            setPageTitle(title || headerTitle);
            return;
        }
        
        setPageTitle(document.title || "Title");
        
        const observer = new MutationObserver(() => {
            if (!title && !headerTitle) {
                setPageTitle(document.title || "Title");
            }
        });
        
        observer.observe(document.querySelector('title'), {
            subtree: true,
            characterData: true,
            childList: true
        });
    }, [title, headerTitle]);

    if(currentType === "default") {
        return (
            <header className="cmp-header">
                <nav>
                    <div className="logo">
                        <a href="#"><img src="/src/assets/image/common/logo.png" alt="" /></a>
                    </div>
    
                    <div className="menu">
                        <ul className="menu__list">
                            <li><i onClick={currentIcon1OnClick} className="ico" style={{background: `url(/icons/${currentIcon1}.svg) no-repeat center center`}}></i></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if(currentType === "header-a") {
        return (
            <header className="cmp-header">
                <nav>
                    <div className="logo">
                        <span className="logo__title">{pageTitle}</span>
                    </div>
    
                    <div className="menu">
                        <ul className="menu__list">
                            <li><i onClick={currentIcon1OnClick} className="ico" style={{background: `url(/icons/${currentIcon1}.svg) no-repeat center center`}}></i></li>
                            <li><i onClick={currentIcon2OnClick} className="ico" style={{background: `url(/icons/${currentIcon2}.svg) no-repeat center center`}}></i></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if(currentType === "header-b") {
        return (
            <header className="cmp-header">
            <nav>
                <div className="mid-title">
                    <div className="back-button">
                        <i onClick={currentIcon1OnClick} className="ico" style={{background: 'url(/icons/arrow-left.svg) no-repeat center center'}}></i>
                    </div>
    
                </div>
    
    
    
                <div className="back">
                    <span className="logo__title">{pageTitle}</span>
                </div>
    
                <div className="menu">
                    <i onClick={currentIcon1OnClick} className="ico" style={{background: `url(/icons/${currentIcon1}.svg) no-repeat center center`}}></i>
                </div>
            </nav>
        </header>
        )
    }

}

export default Header;