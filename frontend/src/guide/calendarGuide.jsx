import WeekCalendar from "@/components/WeekCalendar";
import React from "react";

const CalendarGuide = () => {
    return (
      <div>
        <span>
            기본(type="default")
        </span>
        <WeekCalendar type="default" />
        <span>
            투두리스트(type="todolist")
        </span>
        <WeekCalendar type="todolist" />
      </div>
    );
  };
  
  export default CalendarGuide;