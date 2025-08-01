import React from 'react';
import MainLayout from "@/pages/MainLayout";
import HomeProfile from '@/components/profile/homeProfile';
import ProgressCard from '@/components/card/progressCard';
import TodoList from '@/components/todo/todoList';
import GroupCard from "@/components/group/GroupCard";
import WeekCalendar from "@/components/calendar/WeekCalendar";
import SubTitle from '@/components/subtitle/subTitle';
import { useNavigate } from 'react-router-dom';

const MainPage = () => {
  const navigate = useNavigate();
  const [totalGoals, setTotalGoals] = React.useState(0);
  const [completedGoals, setCompletedGoals] = React.useState(0);

  const handleTodoProgressChange = (total, completed) => {
    setTotalGoals(total);
    setCompletedGoals(completed);
  };

  return (
    <MainLayout
      headerProps={{
        type: "default",
        icon1: "notifications",
      }}
    >
        <HomeProfile/>
        <ProgressCard/>
        <div>
            <SubTitle title="투두리스트" type="link" link="/todolist" />
            <TodoList type='home' selectedDate={new Date().toISOString().slice(0, 10)} onTodoProgressChange={handleTodoProgressChange}/>
        </div>
        <div onClick={() => navigate('/group')} style={{cursor: 'pointer'}}>
            <SubTitle title="그룹"/>
            <GroupCard />
        </div>
        <div>
            <SubTitle title="주간 진행 상태" type="desc" desc="7일 연속 불타는 중🔥(상황에 따라 다른 말) " />
            <WeekCalendar type="default" isTodayGoalCompleted={totalGoals > 0 && totalGoals === completedGoals} />
        </div>
    </MainLayout>
  );
};

export default MainPage;