import React from 'react';
import MainLayout from "@/pages/MainLayout";
import HomeProfile from '@/components/homeProfile';
import ProgressCard from '@/components/progressCard';
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
    </MainLayout>
  );
};

export default MainPage;