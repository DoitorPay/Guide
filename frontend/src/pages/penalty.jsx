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
import { useUserGroupStore } from '@/stores/useUserGroupStore';

const PenaltyPage = () => {
  const navigate = useNavigate();
  const { user: userInfo } = useAuthStore();
  const { activeGroups, fetchUserGroups } = useUserGroupStore();

  const [selectedGroupName, setSelectedGroupName] = useState(null);
  const [sortFilter, setSortFilter] = useState('전체');
  const [sortPopupOpen, setSortPopupOpen] = useState(false);
  const [feeds, setFeeds] = useState([]);
  const [groupTodos, setGroupTodos] = useState([]);
  const [isTodosLoading, setIsTodosLoading] = useState(false);

  useEffect(() => {
    if (userInfo?.id) {
      fetchUserGroups(userInfo.id);
    }
  }, [userInfo?.id, fetchUserGroups]);

  useEffect(() => {
    const fetchGroupTodos = async () => {
      if (!selectedGroupName) {
        setGroupTodos([]);
        return;
      }
      const selectedGroup = activeGroups.find(g => g.name === selectedGroupName);
      if (!selectedGroup) return;

      setIsTodosLoading(true);
      try {
        const response = await fetch(`http://localhost:8000/api/group/todo?id=${selectedGroup.gid}`);
        if (!response.ok) throw new Error('그룹 투두리스트 로딩 실패');
        
        const data = await response.json();
        setGroupTodos(data.todo || []);
      } catch (error) {
        console.error(error);
        setGroupTodos([]);
      } finally {
        setIsTodosLoading(false);
      }
    };

    fetchGroupTodos();
  }, [selectedGroupName, activeGroups]);

  const rouletteStatus = useMemo(() => {
    const selectedGroup = activeGroups.find(g => g.name === selectedGroupName);
    if (!selectedGroup) {
      return { isDisabled: false, message: '' };
    }

    const now = new Date();
    
    const weeklyDeadline = new Date(now);
    const dayOfWeek = now.getDay();
    const daysUntilSunday = dayOfWeek === 0 ? 0 : 7 - dayOfWeek;
    weeklyDeadline.setDate(now.getDate() + daysUntilSunday);
    weeklyDeadline.setHours(23, 59, 59, 999); 

    const hasIncompleteTodo = groupTodos.length > 0 && groupTodos.some(todo => todo.done === 'false');
    if (now < weeklyDeadline) {
      const deadlineStr = weeklyDeadline.toISOString().split('T')[0];
      return { isDisabled: true, message: `아직 주간 미션 기간이에요! (${deadlineStr} 마감)` };
    }

    if (hasIncompleteTodo) {
      return { isDisabled: false, message: '' };
    } else {
      return { isDisabled: true, message: '이번 주 미션을 모두 완료해서 벌칙이 면제됐어요!' };
    }

  }, [selectedGroupName, activeGroups, groupTodos]);

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
      <div style={{ 
        opacity: rouletteStatus.isDisabled ? 0.4 : 1, 
        pointerEvents: rouletteStatus.isDisabled ? 'none' : 'auto',
        transition: 'opacity 0.3s ease-in-out'
      }}>
        <SubTitle title="벌칙 룰렛 돌리기" type="info" info="면제 카드 2장" />
        {rouletteStatus.isDisabled && (
          <div style={{ textAlign: 'center', padding: '1rem 0', color: 'var(--color-gray-scale-500)', fontSize: 'clamp(14px, 3.5vw, 16px)' }}>
            {rouletteStatus.message}
          </div>
        )}
        <Roulette
          punishList={roulettePenalties}
          onSpinRequest={handleRouletteApiCall}
        />
      </div>

      <div>
        <SubTitle title="벌칙 인증 피드" />
        <MissionFeed feeds={feeds} onClickFeed={(feed) => navigate('/penaltycertification', { state: { penalty: feed.originalPenalty, feedUser: { nickname: feed.user, profile: feed.avatar }, image: feed.image } })} />
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
                ? () => navigate('/penaltycertification', { state: { penalty: item, feedUser: userInfo } })
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