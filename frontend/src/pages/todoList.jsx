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

    // end_date가 가장 임박한 활성 그룹의 이름과 ID를 가져오기
    const [groupStartDate, setGroupStartDate] = useState(null);
    
    useEffect(() => {
        if (activeGroups && activeGroups.length > 0) {
            const currentDate = new Date();
            
            // end_date가 가장 임박한 그룹 찾기
            const mostImminentGroup = activeGroups.reduce((closest, current) => {
                const currentEndDate = new Date(current.end_date);
                const closestEndDate = new Date(closest.end_date);
                
                // 현재 날짜보다 미래인 그룹들 중에서 가장 가까운 것 선택
                if (currentEndDate > currentDate && closestEndDate > currentDate) {
                    return currentEndDate < closestEndDate ? current : closest;
                } else if (currentEndDate > currentDate) {
                    return current;
                } else if (closestEndDate > currentDate) {
                    return closest;
                } else {
                    // 둘 다 과거인 경우 더 최근 것 선택
                    return currentEndDate > closestEndDate ? current : closest;
                }
            });
            
            setGroupName(`${mostImminentGroup.name} 목표`);
            setGroupId(mostImminentGroup.gid);
            setGroupStartDate(mostImminentGroup.time_created);
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
                <SubTitle title={groupName} type="week" groupStartDate={groupStartDate}/>
                <TodoList type="group" groupId={groupId} />
            </div>
            <PanaltyNoti />
        </MainLayout>
    )
}

export default TodoListPage;