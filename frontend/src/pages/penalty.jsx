import React, { useState, useMemo } from 'react';
import MainLayout from "@/pages/MainLayout";
import SubTitle from '@/components/subtitle/subTitle';
import Roulette from '@/components/roulette/roulette';
import HistoryCard from '@/components/card/HistoryCard';
import MoreOption from '@/components/popupModal/moreOption';

const dummyData = [
  { title: '벌칙 A', groupName: '그룹 A', deadline: '2025.07.10', isCertified: false },
  { title: '벌칙 B', groupName: '그룹 B', deadline: '2025.07.11', isCertified: true, image: 'https://picsum.photos/300/300' },
  { title: '벌칙 C', groupName: '그룹 C', deadline: '2025.07.12', isCertified: false },
];

const punishments = ['엉덩이로 이름 쓰기', '벌칙2', '벌칙3'];

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

  return (
    <MainLayout
      contentBg="var(--color-background)"
      headerProps={{ title: "벌칙", type: "header-a", icon1: "none" }}
    >
      <div>
        <SubTitle title="벌칙 룰렛 돌리기" type="info" info="면제 카드 2장" />
        <Roulette items={punishments} />
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
