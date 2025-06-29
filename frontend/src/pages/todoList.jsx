import React from 'react';
import MainLayout from '@/pages/MainLayout';
import WeekCalendar from '@/components/WeekCalendar';
import SubTitle from '@/components/SubTitle';
import TodoList from '@/components/todoList';

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
        </MainLayout>
    )
}

export default TodoListPage;