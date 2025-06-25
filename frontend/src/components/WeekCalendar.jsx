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
import leftArrow from "/icons/arrow-left.svg";
import rightArrow from "/icons/arrow-right.svg";

const generateWeekDates = (baseDate) => {
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1 });
  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    const fullDate = format(date, 'yyyy-MM-dd');

    result.push({
      label: format(date, 'EEE', { locale: ko }),
      date: format(date, 'd'),
      fullDate,
      isToday: isToday(date),
      checked: false,
    });
  }

  return result;
};

const WeekCalendar = ({ type = 'default' }) => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [days, setDays] = useState(generateWeekDates(currentDate));

  const toggleCheck = (targetDate) => {
    setDays((prev) =>
      prev.map((day) =>
        day.fullDate === targetDate ? { ...day, checked: !day.checked } : day
      )
    );
  };

  const goPrevWeek = () => {
    const newDate = subWeeks(currentDate, 1);
    setCurrentDate(newDate);
    setDays(generateWeekDates(newDate));
  };

  const goNextWeek = () => {
    const newDate = addWeeks(currentDate, 1);
    setCurrentDate(newDate);
    setDays(generateWeekDates(newDate));
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
        {days.map((day, idx) => (
          <div
            key={idx}
            className={`day-item ${day.checked ? 'checked' : ''} ${day.isToday ? 'today' : ''}`}
            onClick={() => toggleCheck(day.fullDate)}
          >
            <span className={`check ${day.checked ? 'visible' : ''}`}>
              <img src={checkIcon} />
            </span>
            <span className="label">{day.label}</span>
            <span className="date">{day.date}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeekCalendar;
