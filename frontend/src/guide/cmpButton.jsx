import React from "react";
import Button from "@/components/button";
import "@/assets/css/index.css";

function cmpButton() {
    return (
            <div className="cmp-guide">
                <p className="guide-text-title">
                    type: 버튼 타입<br />
                    buttonName: 버튼에 표시될 글자<br />
                    onClick: 클릭시 실행될 함수<br />
                    aria: 접근성 아리아<br />
                    disabled: 비활성화 여부(기본은 false이고, disabled 입력시 true로 전환)

                </p>
                <p className="guide-text-desc">type: default</p>
                <Button buttonName="인증요청"/> &nbsp;
                <Button buttonName="가이드" disabled />

                <br></br><br></br>
                <p className="guide-text-desc">type: primary</p>
                <Button type="primary" buttonName="버튼 활성화"/> &nbsp;
                <Button type="primary" buttonName="버튼 비활성화" disabled />
            </div>
    );
}

export default cmpButton;
