import React, { useState } from 'react';
import MainLayout from '@/pages/MainLayout';
import WeekCalendar from '@/components/calendar/WeekCalendar';
import SubTitle from '@/components/subtitle/SubTitle';
import TodoList from '@/components/todo/todoList';
import PanaltyNoti from '@/components/panalty/panaltyNoti';
import { format } from 'date-fns';

const TodoListPage = () => {
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [completedDates, setCompletedDates] = useState({});

    const handleDateSelect = (date) => {
        setSelectedDate(format(new Date(date), 'yyyy-MM-dd'));
    };

    return (
        <MainLayout
            headerProps={{
                type: "header-a",
                title: "투두리스트",
                icon1: "notifications",
            }}
        >
            <WeekCalendar type="todolist" onDateSelect={handleDateSelect} completedDates={completedDates} selectedDate={selectedDate} />

            <div>
                <SubTitle title="오늘의 목표" type="date" date={selectedDate} />
                <TodoList type="page-todolist" selectedDate={selectedDate} onAllTodosChange={setCompletedDates} />
            </div>

            <div>
                <SubTitle title="그룹1 목표" type="week"/>
                <TodoList type="group" groupId="1" />
            </div>
            <PanaltyNoti />
        </MainLayout>
    )
}

export default TodoListPage;