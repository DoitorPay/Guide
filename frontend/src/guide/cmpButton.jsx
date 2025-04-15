import React from "react";
import Button from "@/components/button";

function guideClick() {
    console.log("버튼이 클릭되었습니다.");
}

function cmpButton() {
    return (
            <div className="cmp-guide">
                <p className="guide-text-title">
                    type: 버튼 타입(기본값 default)<br />
                    buttonName: 버튼에 표시될 글자<br />
                    onClick: 클릭시 실행될 함수<br />
                    aria: 접근성 아리아<br />
                    disabled: 비활성화 여부(기본값 false. disabled 입력시 true로 전환)

                </p>
                <p className="guide-text-desc">type: default</p>
                <Button buttonName="인증요청" onClick={guideClick} aria="인증요청 바로가기"/> &nbsp;
                <Button buttonName="가이드" disabled />

                <br></br><br></br>
                <p className="guide-text-desc">type: primary</p>
                <Button type="primary" onClick={guideClick} buttonName="버튼 활성화"/> &nbsp;
                <Button type="primary" buttonName="버튼 비활성화" disabled />

                <br></br>

                <br></br><br></br>
                <p className="guide-text-desc">type: secondary</p>
                <Button type="secondary" onClick={guideClick} buttonName="고객센터 연결"/> &nbsp;

                <br></br>
                <p className="guide-text-desc">type: close</p>
                <Button type="close" onClick={guideClick} /> &nbsp;
            </div>
    );
}

export default cmpButton;
