import React, { useState, useEffect } from 'react';
import Input from '@/components/input/Input';
import MoreOption from '@/components/popupModal/MoreOption';
import ArrowDown from '/icons/arrow-bottom.svg';

const weekdays = ['월', '화', '수', '목', '금', '토', '일'];

const MissionDaySelector = ({ value, onChange }) => {
  const [showOptions, setShowOptions] = useState(false);

  const handleSelect = (day) => {
    onChange(day);
    setShowOptions(false);
  };

  return (
    <>
      <Input
        label="그룹 미션 인증 요일"
        name="missionDay"
        placeholder="요일을 선택해주세요."
        value={value}
        readOnly
        icon={<img src={ArrowDown} alt="화살표" className="svg-icon" />}
        onClick={() => setShowOptions(true)}
        required
      />

      <MoreOption
        title="요일 선택"
        options={weekdays.map((day) => ({
          label: day,
          onClick: () => handleSelect(day),
        }))}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
      />
    </>
  );
};

export default MissionDaySelector;
