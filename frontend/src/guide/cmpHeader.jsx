import React, { useEffect } from "react";
import Header from "@/components/header";
import useStore from "@/store/headerStore";

function CmpHeader() {
    // Zustand 스토어에서 액션 함수들 가져오기
    const { 
        setHeaderType, 
        setHeaderTitle, 
        setHeaderIcon1, 
        setHeaderIcon2,
        setHeaderIcon1OnClick
    } = useStore();

    const handleIconClick = () => {
        alert("Zustand 스토어에서 설정된 아이콘 클릭 이벤트!");
    };

    const setupZustandExample = () => {
        setHeaderType("header-a");
        setHeaderTitle("Zustand로 설정된 타이틀");
        setHeaderIcon1("settings");
        setHeaderIcon2("notifications");
        setHeaderIcon1OnClick(handleIconClick);
    };


    useEffect(() => {
        setupZustandExample();
        
        return () => {
            setHeaderType("default");
            setHeaderTitle("Title");
            setHeaderIcon1("center-focus-strong");
            setHeaderIcon2("center-focus-strong");
            setHeaderIcon1OnClick(() => {});
        };
    }, []);
    
    return(
        <div className="cmp-guide">
            <p className="guide-text-title">기본형 / type = "default"</p>
            <div className="example-guide cmp-header">
                <Header />
            </div>

            <br /><br /><br />

            <p className="guide-text-title">무제 / type = "header-a" (props 사용)</p>
            <div className="example-guide cmp-header">
                <Header type="header-a" icon1="home" icon2="menu" />
            </div>

            <br /><br /><br />

            <p className="guide-text-title">무제2 / type = "header-b"</p>
            <div className="example-guide cmp-header">
                <Header type="header-b" />
            </div>
            
            <br /><br /><br />

            {/* <p className="guide-text-title">Zustand 스토어 사용 예제</p>
            <p className="guide-text-description">
                이 헤더는 props 없이 Zustand 스토어의 값을 사용합니다.
                useEffect에서 스토어 값을 설정했습니다.
            </p>
            <div className="example-guide cmp-header">
                <Header />
            </div>
            
            <br /><br />
            
            <button 
                onClick={setupZustandExample} 
                style={{ padding: '8px 16px', margin: '10px 0' }}
            >
                Zustand 스토어 설정 예제 다시 실행
            </button> */}
        </div>
        
    );
}

export default CmpHeader;