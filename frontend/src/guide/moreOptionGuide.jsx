import React, { useState } from "react";
import Button from "@/components/button/button";
import MoreOption from "@/components/popupModal/moreOption";

const MoreOptionGuide = () => {
    // 필수 함수
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
    function handleMoreOption() {
        setIsMoreOptionOpen(!isMoreOptionOpen);
    }
    


    // 예시 함수
    function clickDay(label) {
        alert(`${label} 클릭`);
        setIsMoreOptionOpen(false); // 모달 닫기
    }
    
    return (
        <div className="cmp-guide">
            <p className="guide-text-title">
            title: 메인 타이틀<br />
            options: 배열 형태로 리스트를 작성<br />
            isOpen: 특정 액션시 모달을 여는 prop (true/false) <br/>
            onClose: overlay 클릭 시 모달을 닫는 콜백 함수<br />
            </p>


            <Button buttonName="팝업 띄우기" aria="팝업 띄우기" onClick={handleMoreOption}/>
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
                isOpen={isMoreOptionOpen}
                onClose={handleMoreOption}
            />
        </div>
    )
}

export default MoreOptionGuide;