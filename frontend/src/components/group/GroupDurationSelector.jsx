import React, { useState, useEffect } from 'react';
import Input from '@/components/input/Input';
import MoreOption from '@/components/popupModal/moreOption';
import ArrowDown from '/icons/arrow-bottom.svg';

const getTodayISOString = () => {
  const now = new Date();
  return now.toISOString().split('T')[0]; 
};

const getEndDateFromWeeks = (weeks) => {
  const start = new Date();
  const end = new Date(start.setDate(start.getDate() + weeks * 7));
  return end.toISOString().split('T')[0];
};

const getWeeksFromEndDate = (endDateStr) => {
  const start = new Date();
  const end = new Date(endDateStr);
  const diffDays = Math.ceil((end - start) / (1000 * 60 * 60 * 24));
  return Math.min(Math.max(Math.round(diffDays / 7), 1), 12);
};

const GroupDurationSelector = ({ isChecked = false, onChange }) => {
  const [durationWeeks, setDurationWeeks] = useState(1);
  const [endDate, setEndDate] = useState(getEndDateFromWeeks(1));
  const [showOptions, setShowOptions] = useState(false);

  const options = Array.from({ length: 12 }, (_, i) => ({
    label: `${i + 1}주`,
    onClick: () => {
      const newEnd = getEndDateFromWeeks(i + 1);
      setDurationWeeks(i + 1);
      setEndDate(newEnd);
      setShowOptions(false);
    }
  }));

  const handleDateChange = (e) => {
    const newDate = e.target.value;
    const newWeeks = getWeeksFromEndDate(newDate);
    setEndDate(newDate);
    setDurationWeeks(newWeeks);
  };

  useEffect(() => {
    if (onChange) {
      onChange({
        duration_weeks: durationWeeks,
        end_date: endDate
      });
    }
  }, [durationWeeks, endDate]);

  return (
    <div className="how-long-wrap">
      <Input
        label="그룹유지기간"
        name="howLong"
        placeholder="기간(단위:주)"
        value={`${durationWeeks}주`}
        icon={<img src={ArrowDown} alt="화살표" className="svg-icon" />}
        onClick={() => !isChecked && setShowOptions(true)}
        readOnly
        required
        disabled={isChecked}
      />
      <Input
        name="whenEnd"
        type="date"
        min={getTodayISOString()}
        value={endDate}
        onChange={handleDateChange}
        required
        disabled={isChecked}
      />

      <MoreOption
        title="그룹 유지 기간 선택"
        options={options}
        isOpen={showOptions}
        onClose={() => setShowOptions(false)}
      />
    </div>
  );
};

export default GroupDurationSelector;
