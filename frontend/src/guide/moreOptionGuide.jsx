import React, { useState } from "react";
import Button from "@/components/button/button";
import MoreOption from "@/components/popupModal/moreOption";

const MoreOptionGuide = () => {

    
    // 모달 열기, 닫기
    const [open, setOpen] = useState(false);
    


    // 예시 함수
    function clickDay(label) {
        alert(`${label} 클릭`);
        setOpen(false); // 모달 닫기
    }
    
    return (
        <div className="cmp-guide">
            <p className="guide-text-title">
            title: 메인 타이틀<br />
            options: 배열 형태로 리스트를 작성<br />
            isOpen: true/false (useState를 통해 조작) <br/>
            onClose: 모달창 밖 overlay클릭시 창 닫기<br />
            </p>


            <Button buttonName="팝업 띄우기" aria="팝업 띄우기" onClick={() => setOpen(true)}/>
            <MoreOption
                title="타이틀입니다"
                options={[
                    { label: "월요일", onClick: () => clickDay("월요일") },
                    { label: "화요일", onClick: () => clickDay("화요일") },
                    { label: "수요일", onClick: () => clickDay("수요일") },
                    { label: "목요일", onClick: () => clickDay("목요일") },
                    { label: "금요일", onClick: () => clickDay("금요일") },
                    { label: "토요일", onClick: () => clickDay("토요일") },
                    { label: "일요일", onClick: () => clickDay("일요일") }
                ]}
                isOpen={open}
                onClose={() => setOpen(false)}
            />
        </div>
    )
}

export default MoreOptionGuide;