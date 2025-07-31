import React, { useState } from 'react';
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

const generateWeekDates = (baseDate, type = 'default') => {
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
        isChecked: type === 'todolist' && today,
      });
    }
  
    return result;
  };
  

const WeekCalendar = ({ type = 'default', onDateSelect }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState(generateWeekDates(new Date(), type));

  const goPrevWeek = () => {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    setDays(generateWeekDates(newDate, type));
  };

  const goNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    setDays(generateWeekDates(newDate, type));
  };

  const toggleCheck = (targetDate) => {
    setDays((prev) =>
      prev.map((day) => {
        if (type === 'todolist') {
          return {
            ...day,
            isChecked: day.fullDate === targetDate,
          };
        } else {
          return day.fullDate === targetDate
            ? { ...day, isChecked: !day.isChecked }
            : day;
        }
      })
    );
    if (onDateSelect) {
      onDateSelect(new Date(targetDate).toISOString().slice(0, 10));
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
                days.some((d) => !d.isToday && d.isChecked);

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
