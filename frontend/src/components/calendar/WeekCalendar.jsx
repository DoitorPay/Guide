import React, { useState, useEffect } from 'react';
import {
  startOfWeek,
  addDays,
  isToday,
  format,
  addWeeks,
  subWeeks,
} from 'date-fns';
import { ko } from 'date-fns/locale';
import checkIcon from "/icons/done-red.svg";
import checkIconToday from "/icons/done-white.svg";
import leftArrow from "/icons/arrow-left.svg";
import rightArrow from "/icons/arrow-right.svg";

const generateWeekDates = (baseDate, completedDates = {}, selectedDateForTodolist = null) => {
    const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });
    const result = [];
  
    for (let i = 0; i < 7; i++) {
      const date = addDays(weekStart, i);
      const fullDate = format(date, 'yyyy-MM-dd');
      const today = isToday(date);
  
      result.push({
        label: format(date, 'EEE', { locale: ko }),
        date: format(date, 'd'),
        fullDate,
        isToday: today,
        // todolist 타입에서는 selectedDateForTodolist가 우선, 아니면 completedDates
        isChecked: selectedDateForTodolist ? (fullDate === selectedDateForTodolist) : (completedDates[fullDate] || false),
      });
    }
  
    return result;
  };
  

const WeekCalendar = ({ type = 'default', onDateSelect, completedDates = {}, selectedDate }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState([]); // 초기 상태 빈 배열로 설정

  useEffect(() => {
    // todolist 타입일 때는 selectedDate를 generateWeekDates에 전달
    setDays(generateWeekDates(currentDate, completedDates, type === 'todolist' ? selectedDate : null)); 
  }, [currentDate, type, completedDates, selectedDate]);

  const goPrevWeek = () => {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
  };

  const goNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
  };

  const toggleCheck = (targetDate) => {
    if (type === 'todolist') {
      // todolist 타입에서는 클릭된 날짜를 선택된 것으로 표시
      setDays((prev) =>
        prev.map((day) => ({
          ...day,
          isChecked: day.fullDate === targetDate,
        }))
      );
    } else {
      // default 타입에서는 completedDates prop에 의해 제어됨 (여기서는 변경하지 않음)
    }

    if (onDateSelect) {
      onDateSelect(targetDate);
    }
  };
  
  

  return (
    <div className={`week-calendar ${type}`}>
      {type === 'todolist' && (
        <div className="calendar-header">
          <span className="month-label">
            {format(currentDate, 'yyyy년 M월', { locale: ko })}
          </span>
          <div className='button-wrap'>
            <button onClick={goPrevWeek} className="arrow">
              <img src={leftArrow} alt='이전으로' />
            </button>
            <button onClick={goNextWeek} className="arrow">
              <img src={rightArrow} alt='다음으로' />
            </button>
          </div>
        </div>
      )}

      <div className="day-list">
      {days.map((day, idx) => {
            const isAnotherChecked =
                type === 'todolist' &&
                day.isToday &&
                days.some((d) => !d.isToday && d.isChecked); // todolist 타입에서 오늘이 아닌 다른 날짜가 선택되었을 때

            const checkImage = day.isToday && day.isChecked ? checkIconToday : checkIcon;

            return (
                <div
                key={idx}
                className={`day-item 
                    ${day.isToday ? 'today' : ''} 
                    ${day.isChecked ? 'checked' : ''} 
                    ${isAnotherChecked ? 'inactive-today' : ''}`}
                onClick={() => toggleCheck(day.fullDate)}
                >
                <span className={`check ${day.isChecked ? 'visible' : ''}`}>
                    <img src={checkImage} alt="check" />
                </span>
                <span className="label">{day.label}</span>
                <span className="date">{day.date}</span>
                </div>
            );
            })}
      </div>
    </div>
  );
};

export default WeekCalendar;
