import React from "react";
import Header from "@/components/header"

function CmpHeader() {
    return(
        <div className="cmp-guide">
            <p className="guide-text-title">기본형 / type = "default"</p>
            <div className="example-guide cmp-header">
                <Header />
            </div>

            <br /><br /><br />

            <p className="guide-text-title">무제 / type = "untitled1"</p>
            <div className="example-guide cmp-header">
                <Header type="untitled1" />
            </div>

            <br /><br /><br />

            <p className="guide-text-title">무제2 / type = "depth-close"</p>
            <div className="example-guide cmp-header">
                <Header type="depth-close" />
            </div>
        </div>
        
    );
}

export default CmpHeader;