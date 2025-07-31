import React, { useState, useMemo } from 'react';
import MainLayout from "@/pages/MainLayout";
import SubTitle from '@/components/subtitle/subTitle';
import Roulette from '@/components/roulette/roulette';
import HistoryCard from '@/components/card/HistoryCard';
import MoreOption from '@/components/popupModal/moreOption';
import MissionFeed from "@/components/Group/MissionFeed";
import UserProfileRow from "@/components/Profile/UserProfileRow";

const dummyData = [
  { title: '벌칙 A', groupName: '그룹 A', deadline: '2025.07.10', isCertified: false },
  { title: '벌칙 B', groupName: '그룹 B', deadline: '2025.07.11', isCertified: true, image: 'https://picsum.photos/300/300' },
  { title: '벌칙 C', groupName: '그룹 C', deadline: '2025.07.12', isCertified: false },
];

const PenaltyPage = () => {
  const [sortFilter, setSortFilter] = useState('전체');
  const [sortPopupOpen, setSortPopupOpen] = useState(false);

  const filteredData = useMemo(() => {
    if (sortFilter === '인증') return dummyData.filter(d => d.isCertified);
    if (sortFilter === '미인증') return dummyData.filter(d => !d.isCertified);
    return dummyData;
  }, [sortFilter]);

  const handleOptionClick = (option) => {
    setSortFilter(option);
    setSortPopupOpen(false);
  };

  
  const members = [
    { id: 1, name: "그룹 이름", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 2, name: "그룹 이름", avatar: "https://picsum.photos/40/40",progress: 80  },
  ];


  const feeds = [
    {
      id: 1,
      user: "닉네임",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
    },
    {
      id: 2,
      user: "닉네임",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
    },
  ];
  return (
    <MainLayout
      contentBg="var(--color-background)"
      headerProps={{ title: "벌칙", type: "header-a", icon1: "none" }}
    >
      <div className="section">
      <div className="horizontal-scroll">
        {members.map((member) => (
          <UserProfileRow
            key={member.id}
            variant="vertical"
            size={60}
            src={member.avatar}
            name={member.name}
            border
            isLeader={member.isLeader}
          />
        ))}
      </div>
    </div>

      <div>
        <SubTitle title="벌칙 룰렛 돌리기" type="info" info="면제 카드 2장" />
        <Roulette items={punishments} />
      </div>

      <div>
      < SubTitle title="벌칙 인증 피드" />
        <MissionFeed feeds={feeds} onClickFeed={(feed) => navigate('/penaltycertification')} />
      </div>

      <div>
        <SubTitle
          title="벌칙 히스토리"
          type="link"
          linkIcon="arrow-bottom-gray"
          more={sortFilter}
          link="#"
          onClickMore={() => setSortPopupOpen(true)}
        />

        {filteredData.map((item) => (
          <HistoryCard
            key={item.title}
            title={item.title}
            groupName={item.groupName}
            deadline={item.deadline}
            image={item.image || null}
            isCertified={item.isCertified}
          />
        ))}

        <MoreOption
          title="정렬"
          isOpen={sortPopupOpen}
          onClose={() => setSortPopupOpen(false)}
          options={[
            { label: '전체', onClick: () => handleOptionClick('전체') },
            { label: '미인증', onClick: () => handleOptionClick('미인증') },
            { label: '인증', onClick: () => handleOptionClick('인증') },
          ]}
        />
      </div>
    </MainLayout>
  );
};

export default PenaltyPage;
