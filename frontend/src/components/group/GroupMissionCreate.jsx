import React from 'react';
import Button from '@/components/button/Button'; 

const GroupMissionCreate = ({ isLeader = false }) => {
  return (
    <div className="group-mission-create">
      {isLeader ? (
        <>
          <p className="mission-text">이번주 그룹 미션을 생성해봐요.</p>
          <Button 
          type="primary"
          buttonName="그룹 미션 생성하기"
          />
        </>
      ) : (
        <p className="mission-text">이번주 그룹 미션이 아직 생성되지 않았어요.</p>
      )}
    </div>
  );
};

export default GroupMissionCreate;
