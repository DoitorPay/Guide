import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useUserGroupStore } from '@/stores/useUserGroupStore';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import GroupCardLarge from '@/components/group/GroupCardLarge';

const Group = () => {
  const { userId, fetchUserInfo } = useUserStore();
  const {
    leaderGroups,
    memberGroups,
    fetchUserGroups,
    isLoadingGroups
  } = useUserGroupStore();
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    fetchUserInfo();
    setShowFinished(true);
  }, []);

  useEffect(() => {
    if (userId) fetchUserGroups(userId);
  }, [userId]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  console.log('종료된 그룹 개수', [...leaderGroups, ...memberGroups].filter(g => g.isFinished).length);

  return (
    <MainLayout
      contentBg="var(--color-gray-scale-white)"
      headerProps={{ title: '그룹', type: 'header-a', icon1: 'none' }}
      showFab={true}
    >
      <div>
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
                  isFinished={true}
                />
              ))}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Group;
