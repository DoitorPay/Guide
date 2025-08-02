import React, { useState, useEffect } from 'react';
import MainLayout from "@/pages/MainLayout";
import GroupSearchInput from "@/components/group/GroupSearchInput";
import GroupCard from "@/components/group/GroupCard";
import GroupDetailPopup from "@/components/popupModal/GroupDetailPopup";
import { useGroupStore } from '@/stores/useGroupStore';
import { useUserStore } from '@/stores/useUserStore';
import { useUserGroupStore } from '@/stores/useUserGroupStore';

const GroupSearch = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('latest');
  const [popupVisible, setPopupVisible] = useState(false);

  const groupList = useGroupStore((state) => state.groupList);
  const setSelectedGroup = useGroupStore((state) => state.setSelectedGroup);
  const selectedGroup = useGroupStore((state) => state.selectedGroup);

  const userId = useUserStore((state) => state.userId);
  const fetchUserGroups = useUserGroupStore((state) => state.fetchUserGroups);

  useEffect(() => {
    useGroupStore.getState().fetchGroupList();
    if (userId) {
      fetchUserGroups(userId); 
    }
  }, [userId]);

  const filteredGroups = groupList.filter(group => {
    const isFinished = new Date(group.end_date) < new Date();
    if (isFinished) return false;

    if (!searchQuery) return true;
    return (
      group.name.includes(searchQuery) ||
      group.category?.includes(searchQuery)
    );
  });

  return (
    <MainLayout headerProps={{ type: "header-b", title: "그룹 찾기", icon2: "arrow-left" }}>
      <div className="group-search-page-content">
        <GroupSearchInput onSearch={setSearchQuery} onSortChange={setSortBy} />
        <div className="group-cards-container">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <GroupCard
                key={group.gid}
                title={group.name}
                category={group.category}
                period={`${group.time_created?.split('T')[0]} ~ ${group.end_date?.split('T')[0]}`}
                image={group.thumbnail || 'https://picsum.photos/400/300'}
                isFinished={false}
                onArrowClick={() => {
                  setSelectedGroup(group);
                  setPopupVisible(true);
                }}
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>

        <GroupDetailPopup
          setPopup={popupVisible}
          onClose={() => setPopupVisible(false)}
          onJoin={() => console.log('그룹 가입')}
          group={selectedGroup}
        />
      </div>
    </MainLayout>
  );
};

export default GroupSearch;
