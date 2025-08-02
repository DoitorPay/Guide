import React, { useEffect, useState } from 'react';
import { useUserStore } from '@/stores/useUserStore';
import { useUserGroupStore } from '@/stores/useUserGroupStore';
import MainLayout from '@/pages/MainLayout';
import SubTitle from '@/components/subtitle/subTitle';
import GroupCardLarge from '@/components/group/GroupCardLarge';
import { useNavigate } from 'react-router-dom';
import { getImageURL } from '@/utils/getImageURL'; 

const Group = () => {
  const { userId, fetchUserInfo } = useUserStore();
  const { leaderGroups, memberGroups, fetchUserGroups } = useUserGroupStore();
  const [showFinished, setShowFinished] = useState(false);
  const [groupThumbnails, setGroupThumbnails] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchUserInfo();
    setShowFinished(true);
  }, []);

  useEffect(() => {
    if (userId) fetchUserGroups(userId);
  }, [userId]);

  useEffect(() => {
    const fetchThumbnails = async () => {
      const allGroups = [...leaderGroups, ...memberGroups];
      const thumbnailMap = {};

      await Promise.all(
        allGroups.map(async (group) => {
          const url = await getImageURL({ reason: 'group', gid: group.gid });
          thumbnailMap[group.gid] = url;
        })
      );

      setGroupThumbnails(thumbnailMap);
    };

    if (leaderGroups.length || memberGroups.length) {
      fetchThumbnails();
    }
  }, [leaderGroups, memberGroups]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getMonth() + 1}월 ${date.getDate()}일`;
  };

  const renderGroupCard = (group, isFinished = false, fallbackOffset = 0) => (
    <GroupCardLarge
      key={group.gid}
      title={group.name}
      category={group.category || ''}
      period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
      thumbnailUrl={groupThumbnails[group.gid] || '/images/default-group.png'} 
      members={group.member_count || 0}
      progress={isFinished ? 100 : 50}
      dueDate={isFinished ? '종료됨' : formatDate(group.end_date)}
      avatarList={(group.members || []).slice(0, 3).map((m, idx) =>
        m.profile && m.profile !== ' '
          ? m.profile
          : `https://i.pravatar.cc/24?img=${idx + fallbackOffset}`
      )}
      isFinished={isFinished}
      onClick={() => navigate(`/group/${group.gid}`)}
    />
  );

  return (
    <MainLayout
      contentBg="var(--color-gray-scale-white)"
      headerProps={{ title: '그룹', type: 'header-a', icon1: 'none' }}
      showFab={true}
    >
      <div>
        <SubTitle title={`운영 중인 그룹 (${leaderGroups.filter(g => !g.isFinished).length})`} />
        {leaderGroups.filter(g => !g.isFinished).map((g) => renderGroupCard(g, false, 1))}

        <SubTitle title={`참여 중인 그룹 (${memberGroups.filter(g => !g.isFinished).length})`} />
        {memberGroups.filter(g => !g.isFinished).map((g) => renderGroupCard(g, false, 4))}

        {showFinished && (
          <>
            <SubTitle title={`종료된 그룹 (${[...leaderGroups, ...memberGroups].filter(g => g.isFinished).length})`} />
            {[...leaderGroups, ...memberGroups]
              .filter(g => g.isFinished)
              .map((g) => renderGroupCard(g, true, 7))}
          </>
        )}
      </div>
    </MainLayout>
  );
};

export default Group;
