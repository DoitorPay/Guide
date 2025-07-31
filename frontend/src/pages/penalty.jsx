import React, { useState, useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import Roulette from '@/components/roulette/roulette';
import HistoryCard from '@/components/card/HistoryCard';
import MoreOption from '@/components/popupModal/moreOption';
import MissionFeed from '@/components/Group/MissionFeed';
import UserProfileRow from '@/components/Profile/UserProfileRow';

const PenaltyPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const state = location.state;

  const [sortFilter, setSortFilter] = useState('전체');
  const [sortPopupOpen, setSortPopupOpen] = useState(false);
  const [dummyData, setDummyData] = useState([
    { title: '벌칙 A', groupName: '그룹 A', deadline: '2025.07.10', isCertified: false },
    { title: '벌칙 B', groupName: '그룹 B', deadline: '2025.07.11', image: 'https://picsum.photos/300/300', isCertified: true },
    { title: '벌칙 C', groupName: '그룹 C', deadline: '2025.07.12', isCertified: false },
  ]);
  const [selectedGroupId, setSelectedGroupId] = useState(null);

  React.useEffect(() => {
    if (state?.punishment) {
      const newCard = {
        title: state.punishment,
        groupName: '그룹 A',
        deadline: new Date().toISOString().split('T')[0],
        isCertified: false
      };
      setDummyData(prev => [newCard, ...prev]);
    }
  }, [state]);

  const filteredData = useMemo(() => {
    let filtered = [...dummyData];
    if (selectedGroupId !== null) {
      filtered = filtered.filter(d => d.groupName === selectedGroupId);
    }
    if (sortFilter === '인증') return filtered.filter(d => d.isCertified);
    if (sortFilter === '미인증') return filtered.filter(d => !d.isCertified);
    return filtered;
  }, [sortFilter, selectedGroupId, dummyData]);

  const handleOptionClick = (option) => {
    setSortFilter(option);
    setSortPopupOpen(false);
  };

  const members = [
    { id: 1, name: '그룹 A', avatar: 'https://picsum.photos/40/40', progress: 80 },
    { id: 2, name: '그룹 B', avatar: 'https://picsum.photos/40/40', progress: 80 },
    { id: 3, name: '그룹 C', avatar: 'https://picsum.photos/40/40', progress: 80 },
  ];

  const feeds = [
    {
      id: 1,
      user: '닉네임',
      image: 'https://picsum.photos/300',
      avatar: 'https://picsum.photos/30/30',
    },
    {
      id: 2,
      user: '닉네임',
      image: 'https://picsum.photos/300',
      avatar: 'https://picsum.photos/30/30',
    },
  ];

  return (
    <MainLayout
      contentBg="var(--color-background)"
      headerProps={{ title: '벌칙', type: 'header-a', icon1: 'none' }}
    >
      <div className="section">
        <div className="horizontal-scroll">
          {members.map((member) => (
            <div
              key={member.id}
              style={{ opacity: selectedGroupId === null || selectedGroupId === member.name ? 1 : 0.3 }}
              onClick={() => setSelectedGroupId(prev => prev === member.name ? null : member.name)}
            >
              <UserProfileRow
                name={member.name}
                src={member.avatar}
                variant="vertical"
                size={60}
                border
                isLeader={member.isLeader}
              />
            </div>
          ))}
        </div>
      </div>

      <div>
        <SubTitle title="벌칙 룰렛 돌리기" type="info" info="면제 카드 2장" />
        <Roulette />
      </div>

      <div>
        <SubTitle title="벌칙 인증 피드" />
        <MissionFeed feeds={feeds} onClickFeed={() => navigate('/penaltycertification')} />
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
            key={item.title + item.deadline}
            title={item.title}
            groupName={item.groupName}
            deadline={item.deadline}
            image={item.image || null}
            isCertified={item.isCertified}
            onClick={!item.isCertified ? () => navigate('/penaltyupload', { state: { punishment: item.title } }) : undefined}
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
