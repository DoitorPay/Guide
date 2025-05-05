// header.jsx
import React from "react";

function Header({
    type = "default",
    iconName = "center-focus-strong.svg",
}) {
    if(type == "default") {
        return (
            <header className="cmp-header">
                <nav>
                    <div className="logo">
                        <a href="#"><img src="/src/assets/image/common/logo.png" alt="" /></a>
                    </div>
    
                    <div className="menu">
                        <ul className="menu__list">
                            <li><a href="#"><i className="ico" style={{background: `url(/icons/${iconName}) no-repeat center center`}}></i></a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if(type == "untitled1") {
        return (
            <header className="cmp-header">
                <nav>
                    <div className="logo">
                        <span className="logo__title">Title</span>
                    </div>
    
                    <div className="menu">
                        <ul className="menu__list">
                            <li><a href="#"><i className="ico" style={{background: `url(/icons/${iconName}) no-repeat center center`}}></i></a></li>
                            <li><a href="#"><i className="ico" style={{background: `url(/icons/${iconName}) no-repeat center center`}}></i></a></li>
                        </ul>
                    </div>
                </nav>
            </header>
        );
    } else if(type == "depth-close") {
        return (
            <header className="cmp-header">
            <nav>
                <div className="mid-title">
                    <div className="back-button">
                        <a href="#"><i className="ico" style={{background: 'url(/icons/arrow-left.svg) no-repeat center center'}}></i></a>
                    </div>
    
                </div>
    
    
    
                <div className="back">
                    <span className="logo__title">Title</span>
                </div>
    
                <div className="menu">
                    <a href="#"><i className="ico" style={{background: `url(/icons/${iconName}) no-repeat center center`}}></i></a>
                </div>
            </nav>
        </header>
        )
    }

}

export default Header;