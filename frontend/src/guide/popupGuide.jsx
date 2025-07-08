import React, { useState } from "react";
import Button from "@/components/button/button";
import Popup from "@/components/popupModal/popup";

const PopupGuide = () => {
    const [setPopup, setSetPopup] = useState(false);
    
    function toggleSetPopup() {
        setSetPopup(!setPopup);
    }
    return (
        <div className="cmp-guide">
            <p className="guide-text-title">
            icon: 중앙에 들어갈 아이콘<br />
            title: 메인 타이틀<br />
            subtitle: 서브 타이틀<br />
            buttonName: 버튼1 이름<br />
            button2Name: 버튼2 이름(안 쓰면 자동으로 버튼1만 들어감)<br />
            buttonAria: 버튼1 아리아<br />
            button2Aria: 버튼2 아리아<br />
            onClick: 버튼1 클릭했을 때<br />
            onSecondClick: 버튼2 클릭했을 때<br />
            setPopup: 페이지에서 true/false 토글 함수를 생성해 조절
            </p>


            <Button buttonName="팝업 띄우기" aria="팝업 띄우기" onClick={toggleSetPopup}/>
            <Popup
                icon="done-gray"
                title="title입니다."
                subtitle="subtitle입니다."
                buttonName="닫기"
                onClick={toggleSetPopup}
                button2Name="버튼2"
                setPopup={setPopup}
            />
        </div>
    )
}

export default PopupGuide;