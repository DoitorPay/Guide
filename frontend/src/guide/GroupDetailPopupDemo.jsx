import React, { useState } from "react";
import Button from "@/components/button/button";
import GroupDetailPopup from "@/components/popupModal/GroupDetailPopup";

const GroupDetailPopupDemo = () => {
    const [setPopup, setSetPopup] = useState(false);
    // 토글함수
    function toggleSetPopup() {
        setSetPopup(!setPopup);
    }

    return(
        <div className="cmp-guide">
            <p className="guide-text-title">
            onJoin: 가입 <br />
            setPopup: 페이지에서 true/false 토글 함수를 생성해 조절 <br />
            onClose: 닫기버튼에 대한 함수 임의로 추가
            </p>


            <Button buttonName="팝업 띄우기" aria="팝업 띄우기" onClick={toggleSetPopup}/>
            <GroupDetailPopup
                setPopup={setPopup}
                onClose={toggleSetPopup}
            />
        </div>
    )
}

export default GroupDetailPopupDemo;