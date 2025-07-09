import React, { useState } from "react";
import Button from "@/components/button/button";
import MoreOption from "@/components/popupModal/moreOption";

const MoreOptionGuide = () => {
    const [isMoreOptionOpen, setIsMoreOptionOpen] = useState(false);
    
    function toggleMoreOption() {
        setIsMoreOptionOpen(!isMoreOptionOpen);
    }
    return (
        <div className="cmp-guide">
            <p className="guide-text-title">
            title: 메인 타이틀<br />
            options: 배열 형태로 리스트를 작성<br />
            </p>


            <Button buttonName="팝업 띄우기" aria="팝업 띄우기" onClick={toggleMoreOption}/>
            <MoreOption
                title="타이틀입니다"
                options={[
                    { label: "월요일", onClick: () => console.log("월요일 클릭") },
                    { label: "화요일", onClick: () => console.log("화요일 클릭") },
                    { label: "수요일", onClick: () => console.log("수요일 클릭") },
                ]}
                isOpen={isMoreOptionOpen}
                
            />
        </div>
    )
}

export default MoreOptionGuide;