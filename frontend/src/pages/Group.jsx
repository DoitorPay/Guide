import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useGroupStore } from '@/stores/useGroupStore';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import GroupCardLarge from '@/components/group/GroupCardLarge';

const Group = () => {
  const { userId, fetchUserInfo } = useUserStore();
  const { groups, fetchGroupsForUser } = useGroupStore();
  const [showFinished, setShowFinished] = useState(false);

  useEffect(() => {
    fetchUserInfo();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchGroupsForUser(userId);
    }
  }, [userId]);

  const now = new Date();

  const isGroupFinished = (group) => new Date(group.end_date) < now;

  const ongoingGroups = groups.filter(
    (group) => group.leader_id === userId && !isGroupFinished(group)
  );

  const participatingGroups = groups.filter(
    (group) => group.leader_id !== userId && !isGroupFinished(group)
  );

  const finishedGroups = groups.filter((group) => isGroupFinished(group));

  return (
    <MainLayout
      contentBg="var(--color-gray-scale-white)"
      headerProps={{ title: '그룹', type: 'header-a', icon1: 'none' }}
      showFab={true}
    >
      <div>
        <SubTitle title={`운영 중인 그룹 (${ongoingGroups.length})`} />
        {ongoingGroups.map((group) => (
          <GroupCardLarge
            key={group.gid}
            title={group.name}
            category={group.category}
            period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
            thumbnailUrl="https://picsum.photos/400/400"
            members={group.members?.length || 0}
            progress={50}
            dueDate={group.end_date?.split('-').slice(1).join('월 ') + '일'}
            avatarList={group.members?.slice(0, 3).map((m, idx) =>
              m.profile && m.profile !== ' '
                ? m.profile
                : `https://i.pravatar.cc/24?img=${idx + 1}`
            )}
          />
        ))}

        <SubTitle title={`참여 중인 그룹 (${participatingGroups.length})`} />
        {participatingGroups.map((group) => (
          <GroupCardLarge
            key={group.gid}
            title={group.name}
            category={group.category}
            period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
            thumbnailUrl="https://picsum.photos/400/400"
            members={group.members?.length || 0}
            progress={50}
            dueDate={group.end_date?.split('-').slice(1).join('월 ') + '일'}
            avatarList={group.members?.slice(0, 3).map((m, idx) =>
              m.profile && m.profile !== ' '
                ? m.profile
                : `https://i.pravatar.cc/24?img=${idx + 4}`
            )}
          />
        ))}

        {showFinished && (
          <>
            <SubTitle title={`종료된 그룹 (${finishedGroups.length})`} />
            {finishedGroups.map((group) => (
              <GroupCardLarge
                key={group.gid}
                title={group.name}
                category={group.category}
                period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
                thumbnailUrl="https://picsum.photos/400/400"
                members={group.members?.length || 0}
                progress={100}
                dueDate="종료됨"
                avatarList={group.members?.slice(0, 3).map((m, idx) =>
                  m.profile && m.profile !== ' '
                    ? m.profile
                    : `https://i.pravatar.cc/24?img=${idx + 7}`
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
