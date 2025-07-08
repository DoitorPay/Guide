import React from "react";
import Header from "@/components/header/header"

function CmpHeader() {
    return(
        <div className="cmp-guide">
            <p className="guide-text-title">기본형 / type = "default"</p>
            <div className="example-guide cmp-header">
                <Header />
            </div>

            <br /><br /><br />

            <p className="guide-text-title">무제 / type = "header-a"</p>
            <div className="example-guide cmp-header">
                <Header type="header-a" title="수동 타이틀 설정" icon1="home" icon2="menu" />
            </div>

            <br /><br /><br />

            <p className="guide-text-title">무제2 / type = "header-b"</p>
            <div className="example-guide cmp-header">
                <Header type="header-b" />
            </div>
        </div>
        
    );
}

export default CmpHeader;