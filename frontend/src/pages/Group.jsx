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
    const init = async () => {
      await fetchUserInfo(); // 유저 정보 먼저 받아오기
    };
    init();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchGroupsForUser(userId);
    }
  }, [userId]);

  // 임의 로직: 그룹 상태 분류
  const ongoingGroups = groups.filter(g => g.name.includes("운영"));
  const participatingGroups = groups.filter(g => g.name.includes("참여"));
  const finishedGroups = groups.filter(g => g.name.includes("종료"));

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
            key={group.gid}
            title={group.name}
            category={group.category}
            period={group.duration}
            thumbnailUrl="https://picsum.photos/400/400"
            members={group.members.length}
            progress={50}
            dueDate="5월 20일"
            avatarList={group.members.slice(0, 3).map((m, idx) =>
              m.profile && m.profile !== " " ? m.profile : `https://i.pravatar.cc/24?img=${idx + 1}`
            )}
          />
        ))}

        <SubTitle title={`참여 중인 그룹 (${participatingGroups.length})`} />
        {participatingGroups.map(group => (
          <GroupCardLarge
            key={group.gid}
            title={group.name}
            category={group.category}
            period={group.duration}
            thumbnailUrl="https://picsum.photos/400/400"
            members={group.members.length}
            progress={50}
            dueDate="6월 10일"
            avatarList={group.members.slice(0, 3).map((m, idx) =>
              m.profile && m.profile !== " " ? m.profile : `https://i.pravatar.cc/24?img=${idx + 4}`
            )}
          />
        ))}
      </div>
    </MainLayout>
  );
};

export default Group;
