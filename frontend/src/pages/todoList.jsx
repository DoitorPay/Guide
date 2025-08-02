import React, { useState, useEffect } from 'react';
import MainLayout from '@/pages/MainLayout';
import WeekCalendar from '@/components/calendar/WeekCalendar';
import SubTitle from '@/components/subtitle/SubTitle';
import TodoList from '@/components/todo/todoList';
import PanaltyNoti from '@/components/panalty/panaltyNoti';
import { format } from 'date-fns';
import { useUserGroupStore } from '@/stores/useUserGroupStore';
import { useUserStore } from '@/stores/useUserStore';

const TodoListPage = () => {
    const [selectedDate, setSelectedDate] = useState(format(new Date(), 'yyyy-MM-dd'));
    const [completedDates, setCompletedDates] = useState({});
    const [groupName, setGroupName] = useState('그룹 목표');
    const [groupId, setGroupId] = useState(null);
    
    const { fetchUserGroups, activeGroups } = useUserGroupStore();
    const { userId } = useUserStore();

    const handleDateSelect = (date) => {
        setSelectedDate(format(new Date(date), 'yyyy-MM-dd'));
    };

    // 그룹 정보 가져오기
    useEffect(() => {
        if (userId) {
            fetchUserGroups(userId);
        }
    }, [userId, fetchUserGroups]);

    // 첫 번째 활성 그룹의 이름과 ID를 가져오기
    useEffect(() => {
        if (activeGroups && activeGroups.length > 0) {
            const firstGroup = activeGroups[0];
            setGroupName(`${firstGroup.name} 목표`);
            setGroupId(firstGroup.gid);
        }
    }, [activeGroups]);

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
                <SubTitle title={groupName} type="week"/>
                <TodoList type="group" groupId={groupId} />
            </div>
            <PanaltyNoti />
        </MainLayout>
    )
}

export default TodoListPage;