import React from 'react';
import MainLayout from "@/pages/MainLayout";
import HomeProfile from '@/components/profile/homeProfile';
import ProgressCard from '@/components/card/progressCard';
import TodoList from '@/components/todo/todoList';
import GroupCard from "@/components/group/GroupCard";
import WeekCalendar from "@/components/calendar/WeekCalendar";
import SubTitle from '@/components/subtitle/subTitle';
import { useNavigate } from 'react-router-dom';
import { format } from 'date-fns';

const MainPage = () => {
  const navigate = useNavigate();
  const [completedDates, setCompletedDates] = React.useState({});

  const [userPercent, setUserPercent] = React.useState('0');

  const handleTodoProgressChange = (total, completed) => {
    if (total === 0) {
      setUserPercent('0');
    } else {
      const percent = (completed / total) * 100;
      setUserPercent(Number.isInteger(percent) ? String(percent) : percent.toFixed(2));
    }
  };

  return (
    <MainLayout
      headerProps={{
        type: "default",
        icon1: "notifications",
      }}
    >
        <HomeProfile/>
        <ProgressCard percent={userPercent}/>
        <div>
            <SubTitle title="투두리스트" type="link" link="/todolist" />
            <TodoList type='home' selectedDate={format(new Date(), 'yyyy-MM-dd')} onAllTodosChange={setCompletedDates} onTodoProgressChange={handleTodoProgressChange}/>
        </div>
        <div onClick={() => navigate('/group')} style={{cursor: 'pointer'}}>
            <SubTitle title="그룹"/>
            <GroupCard />
        </div>
        <div>
            <SubTitle title="주간 진행 상태" type="desc" desc="7일 연속 불타는 중🔥(상황에 따라 다른 말) " />
            <WeekCalendar type="default" completedDates={completedDates} />
        </div>
    </MainLayout>
  );
};

export default MainPage;