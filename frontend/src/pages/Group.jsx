import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import GroupCardLarge from '@/components/group/GroupCardLarge';

const Group = () => {
  const { userId, fetchUserInfo } = useUserStore();
  const [leaderGroups, setLeaderGroups] = useState([]);
  const [memberGroups, setMemberGroups] = useState([]);
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    const fetchThumbnail = async (gid) => {
      try {
        const res = await fetch(`http://13.209.6.223:8080/`);
        const link = await res.text(); 
        return link || ''; 
      } catch (err) {
        console.error(`썸네일 요청 실패: ${gid}`, err);
        return '';
      }
    };

    const fetchGroups = async () => {
      if (!userId) return;

      try {
        const res = await fetch('http://localhost:8000/user/group-participating', {
          credentials: 'include',
        });
        const data = await res.json();
        const now = new Date();

        const markFinishedAndAddThumbnail = async (group) => {
          const isFinished = new Date(group.end_date) < now;
          const thumbnailUrl = await fetchThumbnail(group.gid);
          return { ...group, isFinished, thumbnailUrl };
        };

        const leaderProcessed = await Promise.all(
          (data.leader || []).map(markFinishedAndAddThumbnail)
        );
        const memberProcessed = await Promise.all(
          (data.member || []).map(markFinishedAndAddThumbnail)
        );

        setLeaderGroups(leaderProcessed);
        setMemberGroups(memberProcessed);
      } catch (err) {
        console.error('그룹 정보 불러오기 실패:', err);
      }
    };

    fetchGroups();
  }, [userId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  return (
    <MainLayout
      contentBg="var(--color-gray-scale-white)"
      headerProps={{ title: '그룹', type: 'header-a', icon1: 'none' }}
      showFab={true}
    >
      <div>
        {/* 운영 중인 그룹 */}
        <SubTitle title={`운영 중인 그룹 (${leaderGroups.filter(g => !g.isFinished).length})`} />
        {leaderGroups.filter(g => !g.isFinished).map((group) => (
          <GroupCardLarge
            key={group.gid}
            title={group.name}
            category={group.category}
            period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
            thumbnailUrl={group.thumbnailUrl}
            members={group.member_count || 0}
            progress={50}
            dueDate={group.end_date ? formatDate(group.end_date) : ''}
            avatarList={(group.members || []).slice(0, 3).map((m, idx) =>
              m.profile && m.profile !== ' '
                ? m.profile
                : `https://i.pravatar.cc/24?img=${idx + 1}`
            )}
          />
        ))}

        {/* 참여 중인 그룹 */}
        <SubTitle title={`참여 중인 그룹 (${memberGroups.filter(g => !g.isFinished).length})`} />
        {memberGroups.filter(g => !g.isFinished).map((group) => (
          <GroupCardLarge
            key={group.gid}
            title={group.name}
            category={group.category || ''}
            period={`~ ${group.end_date?.split('T')[0]}`}
            thumbnailUrl={group.thumbnailUrl}
            members={group.member_count || 0}
            progress={50}
            dueDate={group.end_date ? formatDate(group.end_date) : ''}
            avatarList={(group.members || []).slice(0, 3).map((m, idx) =>
              m.profile && m.profile !== ' '
                ? m.profile
                : `https://i.pravatar.cc/24?img=${idx + 4}`
            )}
          />
        ))}

        {/* 종료된 그룹 */}
        {showFinished && (
          <>
            <SubTitle title={`종료된 그룹 (${[...leaderGroups, ...memberGroups].filter(g => g.isFinished).length})`} />
            {[...leaderGroups, ...memberGroups]
              .filter(g => g.isFinished)
              .map((group, idx) => (
                <GroupCardLarge
                  key={group.gid}
                  title={group.name}
                  category={group.category || ''}
                  period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
                  thumbnailUrl={group.thumbnailUrl}
                  members={group.member_count || 0}
                  progress={100}
                  dueDate="종료됨"
                  avatarList={(group.members || []).slice(0, 3).map((m, i) =>
                    m.profile && m.profile !== ' '
                      ? m.profile
                      : `https://i.pravatar.cc/24?img=${i + 7}`
                  )}
                />
              ))}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Group;
