import React from 'react';

const PanaltyNoti = ({ 
    remainGoals = 3,
}) => {

    // 추후 DB연동 고려
    
    return (
        <div className="panalty-noti">
            <img src="/icons/report.svg" alt="벌칙 알림" />
            <p className="panalty-noti__title">
                벌칙을 피하기 위해 {remainGoals}개의 목표를 더 완료하세요
            </p>
        </div>
    )
}

export default PanaltyNoti;