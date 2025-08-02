import React, { useEffect, useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import Roulette from '@/components/roulette/roulette';
import HistoryCard from '@/components/card/HistoryCard';
import MoreOption from '@/components/popupModal/moreOption';
import MissionFeed from '@/components/Group/MissionFeed';
import UserProfileRow from '@/components/Profile/UserProfileRow';
import useAuthStore from '@/stores/useAuthStore';
import { useUserGroupStore } from '@/stores/useUserGroupStore'; // [핵심] 오타 수정

const PenaltyPage = () => {
  const navigate = useNavigate();
  const { user: userInfo } = useAuthStore();
  // [핵심] 오타 수정: useUserGroupGroupStore -> useUserGroupStore
  const { activeGroups, fetchUserGroups } = useUserGroupStore();

  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [sortFilter, setSortFilter] = useState('전체');
  const [sortPopupOpen, setSortPopupOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserGroups(userInfo.id);
    }
  }, [userInfo?.id, fetchUserGroups]);

  const handleRouletteApiCall = async () => {
    const selectedGroup = activeGroups.find(g => g.name === selectedGroupName);
    if (!selectedGroup) {
      alert("먼저 그룹을 선택해주세요.");
      return null;
    }
    try {
      const response = await fetch(`http://localhost:8000/api/group/punish-select?id=${selectedGroup.gid}`, {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('벌칙 추첨 실패');

      const resultPenaltyName = await response.json();
      await useAuthStore.getState().checkLoginStatus();
      return resultPenaltyName;
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
      return null;
    }
  };

  const allPenalties = useMemo(() => {
    if (!userInfo || !activeGroups.length) return [];
    const groupMap = new Map(activeGroups.map(g => [g.gid, g.name]));

    const uncertified = (userInfo.punish || []).map(p => {
      const [title, groupId] = p.split('///');
      return { title, groupId, groupName: groupMap.get(groupId) || '알 수 없는 그룹', isCertified: false, deadline: '' };
    });

    const certified = (userInfo.punish_history || []).map(p => {
      const [title, content, groupId, deadline] = p.split('///');
      return { title, content, groupId, groupName: groupMap.get(groupId) || '알 수 없는 그룹', deadline, isCertified: true };
    });

    return [...uncertified.reverse(), ...certified.reverse()];
  }, [userInfo, activeGroups]);

  const penaltiesToDisplay = useMemo(() => {
    let filtered = [...allPenalties];
    if (selectedGroupName) {
      filtered = filtered.filter((p) => p.groupName === selectedGroupName);
    }
    if (sortFilter === '인증') return filtered.filter((p) => p.isCertified);
    if (sortFilter === '미인증') return filtered.filter((p) => !p.isCertified);
    return filtered;
  }, [allPenalties, selectedGroupName, sortFilter]);

  const roulettePenalties = useMemo(() => {
    if (!selectedGroupName) return [];
    const selectedGroup = activeGroups.find(g => g.name === selectedGroupName);
    return (selectedGroup?.punish || []).map(p => ({ title: p }));
  }, [activeGroups, selectedGroupName]);

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
              style={{
                opacity:
                  selectedGroupName === null || selectedGroupName === group.name ? 1 : 0.3,
                transition: 'opacity 0.2s ease-in-out'
              }}
              onClick={() => setSelectedGroupName((prev) => (prev === group.name ? null : group.name))}
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
        <Roulette
          punishList={roulettePenalties}
          onSpinRequest={handleRouletteApiCall}
        />
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
        {penaltiesToDisplay.map((item, idx) => (
          <HistoryCard
            key={`${item.title}-${item.groupId}-${idx}`}
            title={item.title}
            groupName={item.groupName}
            deadline={item.deadline}
            isCertified={item.isCertified}
            onClick={
              item.isCertified
                ? () => navigate('/penaltycertification', { state: { penalty: item } })
                : () =>
                    navigate('/penaltyupload', {
                      state: { punishment: item.title, groupId: item.groupId },
                    })
            }
          />
        ))}
      </div>
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
    </MainLayout>
  );
};

export default PenaltyPage;