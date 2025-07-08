import React from 'react';
import MainLayout from '@/pages/MainLayout';
import WeekCalendar from '@/components/calendar/WeekCalendar';
import SubTitle from '@/components/subtitle/SubTitle';
import TodoList from '@/components/todo/todoList';
import PanaltyNoti from '@/components/panalty/panaltyNoti';

const TodoListPage = () => {
    return (
        <MainLayout
            headerProps={{
                type: "header-a",
                title: "투두리스트",
                icon1: "notifications",
            }}
        >
            <WeekCalendar type="todolist" />

            <div>
                <SubTitle title="오늘의 목표" type="date"/>
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