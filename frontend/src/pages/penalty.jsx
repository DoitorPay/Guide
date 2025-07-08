import React from 'react';
import MainLayout from "@/pages/MainLayout";
import SubTitle from '@/components/subtitle/subTitle';
import Roulette from '@/components/roulette/roulette';
import HistoryCard from '@/components/card/HistoryCard';

const MainPage = () => {
  return (
    <MainLayout contentBg="var(--color-background)"
      headerProps={{
        title: "벌칙",
        type: "header-a",
        icon1: "none",
      }}
    >
        <div>
            <SubTitle title="벌칙 룰렛 돌리기" type="info" info="면제 카드 2장" />
            <Roulette/>
        </div>
        <div>
            <SubTitle title="벌칙 히스토리" type="link"
                link="/study"
                linkIcon="arrow-bottom-gray"
                more='전체'
            />
            <HistoryCard
            title="벌칙 이름"
            groupName="ㅁㄴㅇㄹ"
            deadline="2025.07.10"
            />
            <HistoryCard
            title="벌칙 이름"
            groupName="ㅁㄴㅇㄹ"
            deadline="2025.07.10"
            />
            <HistoryCard
            image="https://picsum.photos/300/300"
            isCertified={true}
            title="벌칙 이름"
            groupName="ㅁㄴㅇㄹ"
            deadline="2025.07.10"
            />
        </div>
    </MainLayout>
  );
};

export default MainPage;