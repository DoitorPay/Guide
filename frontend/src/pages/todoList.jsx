import React, { useState } from 'react';
import MainLayout from '@/pages/MainLayout';
import WeekCalendar from '@/components/calendar/WeekCalendar';
import SubTitle from '@/components/subtitle/SubTitle';
import TodoList from '@/components/todo/todoList';
import PanaltyNoti from '@/components/panalty/panaltyNoti';

const TodoListPage = () => {
    const [selectedDate, setSelectedDate] = useState(new Date());

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };

    return (
        <MainLayout
            headerProps={{
                type: "header-a",
                title: "투두리스트",
                icon1: "notifications",
            }}
        >
            <WeekCalendar type="todolist" onDateSelect={handleDateSelect} />

            <div>
                <SubTitle title="오늘의 목표" type="date" date={selectedDate} />
                <TodoList type="page-todolist" />
            </div>

            <div>
                <SubTitle title="그룹1 목표" type="week"/>
                <TodoList type="group" />
            </div>
            <PanaltyNoti />
        </MainLayout>
    )
}

export default TodoListPage;