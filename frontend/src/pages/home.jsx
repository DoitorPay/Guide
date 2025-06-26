import React from 'react';
import MainLayout from "@/pages/MainLayout";
import HomeProfile from '@/components/homeProfile';
import ProgressCard from '@/components/progressCard';
import TodoList from '@/components/todoList';
import GroupCard from "@/components/group/GroupCard";
import WeekCalendar from "@/components/WeekCalendar";

const MainPage = () => {
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
            {/* 전체보기 컴포넌트 만들어서 넣읍시다.. */}
            <TodoList type='home'/>
        </div>
        <GroupCard />
        <div>
            <WeekCalendar type="default" />
        </div>
    </MainLayout>
  );
};

export default MainPage;