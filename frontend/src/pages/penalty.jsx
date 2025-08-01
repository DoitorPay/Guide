import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import Roulette from '@/components/roulette/roulette';
import HistoryCard from '@/components/card/HistoryCard';
import MoreOption from '@/components/popupModal/moreOption';
import MissionFeed from '@/components/Group/MissionFeed';
import UserProfileRow from '@/components/Profile/UserProfileRow';
import { useUserStore } from '@/stores/useUserStore';
import { useUserGroupStore } from '@/stores/useUserGroupStore';

const PenaltyPage = () => {
  const navigate = useNavigate();
  const { userId, fetchUserInfo } = useUserStore();
  const {
    activeGroups,
    fetchUserGroups,
  } = useUserGroupStore();

  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [sortFilter, setSortFilter] = useState('전체');
  const [sortPopupOpen, setSortPopupOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [penalties, setPenalties] = useState([]);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) fetchUserGroups(userId);
  }, [userId]);

  useEffect(() => {
    const examplePenalties = activeGroups.flatMap((group) =>
      (group.punish || []).map((p, i) => ({
        title: p,
        groupName: group.name,
        deadline: group.end_date?.split('T')[0] || '',
        isCertified: Math.random() > 0.5,
        thumbnailUrl: group.thumbnailUrl,
      }))
    );
    setPenalties(examplePenalties);
  }, [activeGroups]);

  const filteredPenalties = useMemo(() => {
    let filtered = [...penalties];
    if (selectedGroupName) {
      filtered = filtered.filter((p) => p.groupName === selectedGroupName);
    }
    if (sortFilter === '인증') return filtered.filter((p) => p.isCertified);
    if (sortFilter === '미인증') return filtered.filter((p) => !p.isCertified);
    return filtered;
  }, [penalties, selectedGroupName, sortFilter]);

  return (
    <MainLayout
      contentBg="var(--color-background)"
      headerProps={{ title: '벌칙', type: 'header-a', icon1: 'none' }}
    >
      <div className="section">
        <div className="horizontal-scroll">
          {activeGroups.map((group) => (
            <div
              key={group.gid}
              style={{ opacity: selectedGroupName === null || selectedGroupName === group.name ? 1 : 0.3 }}
              onClick={() =>
                setSelectedGroupName((prev) => (prev === group.name ? null : group.name))
              }
            >
              <UserProfileRow
                name={group.name}
                src={group.thumbnailUrl || 'https://picsum.photos/40/40'}
                variant="vertical"
                size={60}
                border
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

        {filteredPenalties.map((item, idx) => (
          <HistoryCard
            key={item.title + item.groupName + idx}
            title={item.title}
            groupName={item.groupName}
            deadline={item.deadline}
            isCertified={item.isCertified}
            onClick={
              !item.isCertified
                ? () => navigate('/penaltyupload', {
                    state: { punishment: item.title },
                  })
                : undefined
            }
          />
        ))}

        <MoreOption
          title="정렬"
          isOpen={sortPopupOpen}
          onClose={() => setSortPopupOpen(false)}
          options={['전체', '미인증', '인증'].map((label) => ({
            label,
            onClick: () => {
              setSortFilter(label);
              setSortPopupOpen(false);
            },
          }))}
        />
      </div>
    </MainLayout>
  );
};

export default PenaltyPage;
