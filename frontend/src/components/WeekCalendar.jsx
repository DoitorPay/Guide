import React, { useState } from 'react';
import {
  startOfWeek,
  addDays,
  isToday,
  format,
} from 'date-fns';
import { ko } from 'date-fns/locale';

const getWeekDates = () => {
  const weekStart = startOfWeek(new Date(), { weekStartsOn: 1 });
  const result = [];

  for (let i = 0; i < 7; i++) {
    const date = addDays(weekStart, i);
    result.push({
      label: format(date, 'EEE', { locale: ko }), 
      date: format(date, 'd'),                    
      fullDate: format(date, 'yyyy-MM-dd'),     
      isToday: isToday(date),
      checked: false, 
    });
  }

  return result;
};

const WeekCalendar = () => {
  const [days, setDays] = useState(getWeekDates());

  const toggleCheck = (targetDate) => {
    const updated = days.map((day) =>
      day.fullDate === targetDate
        ? { ...day, checked: !day.checked }
        : day
    );
    setDays(updated);
  };

  return (
    <div className="week-calendar">
      {days.map((day, idx) => (
        <div
          key={idx}
          className={`day-item ${day.checked ? 'checked' : ''} ${day.isToday ? 'today' : ''}`}
          onClick={() => toggleCheck(day.fullDate)}
        >
          <span className={`check ${day.checked ? 'visible' : ''}`}>✔</span>
          <span className="label">{day.label}</span>
          <span className="date">{day.date}</span>
        </div>
      ))}
    </div>
  );  
};

export default WeekCalendar;
