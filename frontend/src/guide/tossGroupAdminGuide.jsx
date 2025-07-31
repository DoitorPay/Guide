import React, { useState } from "react";
import Button from "@/components/button/button";
import TossGroupAdmin from "@/components/group/tossGroupAdmin";

const TossGroupAdminGuide = () => {
    const [setPopup, setSetPopup] = useState(false);
    const dummyMembers = [
        { id: 1, name: "홍길동", profile: "/images/default-avatar.png" },
        { id: 2, name: "홍길순", profile: "/images/default-avatar.png" },
        { id: 3, name: "홍길차", profile: "/images/default-avatar.png" },
        { id: 4, name: "홍길타", profile: "/images/default-avatar.png" },
        { id: 5, name: "홍길오", profile: "/images/default-avatar.png" },
        { id: 6, name: "홍길동", profile: "/images/default-avatar.png" },
        { id: 7, name: "홍길순", profile: "/images/default-avatar.png" },
        { id: 8, name: "홍길차", profile: "/images/default-avatar.png" },
        { id: 9, name: "홍길타", profile: "/images/default-avatar.png" },
        { id: 10, name: "홍길오", profile: "/images/default-avatar.png" },
    ];
    
    // 토글함수
    function toggleSetPopup() {
        setSetPopup(!setPopup);
    }
    return (
        <div className="cmp-guide">
            <p className="guide-text-title">
            members: 그룹멤버 목록(API연동시) <br />
            onClick: 취소 버튼 클릭했을 때<br />
            onSecondClick: 위임하기 버튼 클릭했을 때<br />
            setPopup: 페이지에서 true/false 토글 함수를 생성해 조절
            </p>


            <Button buttonName="팝업 띄우기" aria="팝업 띄우기" onClick={toggleSetPopup}/>
            <TossGroupAdmin
                members={dummyMembers}
                onClick={toggleSetPopup}
                setPopup={setPopup}
            />
        </div>
    )
}

export default TossGroupAdminGuide;