import React, { useState } from 'react';
import MainLayout from "@/pages/MainLayout";
import SubTitle from '@/components/subtitle/subTitle';
import GroupCardLarge from '@/components/group/GroupCardLarge';

const dummyData = [
  {
    id: 1,
    title: "프로젝트를드가",
    category: "개발, 공부",
    period: "2025.04.17 ~ 2025.06.17",
    image: "https://picsum.photos/400/400",
    type: "운영중"
  },
  {
    id: 2,
    title: "리액트 프로젝트",
    category: "개발, 공부",
    period: "2025.05.01 ~ 2025.07.31",
    image: "https://picsum.photos/400/400",
    type: "참여중"
  },
  {
    id: 3,
    title: "기획서의 정석",
    category: "기획, 공부",
    period: "2025.03.10 ~ 2025.05.10",
    image: "https://picsum.photos/400/400",
    type: "종료"
  },
  {
    id: 4,
    title: "독서 모임 그룹",
    category: "문화, 독서",
    period: "2025.06.01 ~ 2025.08.31",
    image: "https://picsum.photos/400/400",
    type: "종료"
  },
  {
    id: 5,
    title: "주식 스터디 그룹",
    category: "경제, 투자",
    period: "2025.07.01 ~ 2025.09.30",
    image: "https://picsum.photos/400/400",
    type: "운영중"
  },
];

const Group = () => {
  const [showFinished, setShowFinished] = useState(false);

  const ongoingGroups = dummyData.filter(group => group.type === '운영중');
  const participatingGroups = dummyData.filter(group => group.type === '참여중');
  const finishedGroups = dummyData.filter(group => group.type === '종료');

  return (
    <MainLayout
      contentBg="var(--color-gray-scale-white)"
      headerProps={{ title: "그룹", type: "header-a", icon1: "none" }}
      showFab={true}
    >
      <div>
        <SubTitle title={`운영 중인 그룹 (${ongoingGroups.length})`} />
        {ongoingGroups.map(group => (
          <GroupCardLarge
            key={group.id}
            title={group.title}
            category={group.category}
            period={group.period}
            thumbnailUrl={group.image}
            members={8}
            progress={50}
            dueDate="5월 20일"
            avatarList={[
              'https://i.pravatar.cc/24?img=1',
              'https://i.pravatar.cc/24?img=2',
              'https://i.pravatar.cc/24?img=3',
            ]}
          />
        ))}

        <SubTitle title={`참여 중인 그룹 (${participatingGroups.length})`} />
        {participatingGroups.map(group => (
          <GroupCardLarge
            key={group.id}
            title={group.title}
            category={group.category}
            period={group.period}
            thumbnailUrl={group.image}
            members={8}
            progress={50}
            dueDate="6월 10일"
            avatarList={[
              'https://i.pravatar.cc/24?img=4',
              'https://i.pravatar.cc/24?img=5',
              'https://i.pravatar.cc/24?img=6',
            ]}
          />
        ))}

        

      </div>
    </MainLayout>
  );
};

export default Group;
