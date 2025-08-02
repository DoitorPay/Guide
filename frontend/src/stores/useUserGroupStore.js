import { create } from 'zustand';

export const useUserGroupStore = create((set) => ({
  leaderGroups: [],
  memberGroups: [],
  activeGroups: [],
  isLoadingGroups: false,

  fetchUserGroups: async (userId) => {
    if (!userId) return;
    set({ isLoadingGroups: true });

    try {
      const res = await fetch('http://localhost:8000/api/user/group-participating', {
        credentials: 'include',
      });
      const data = await res.json();
      const now = new Date();

      const fetchThumbnail = async (gid) => {
        try {
          const res = await fetch(`http://localhost:8000/api/group/${gid}/thumbnail`);
          const link = await res.text();
          return link || '';
        } catch (err) {
          console.error(`썸네일 요청 실패: ${gid}`, err);
          return '';
        }
      };

      const processGroup = async (group) => {
        const isFinished = new Date(group.end_date) < now;
        const thumbnailUrl = await fetchThumbnail(group.gid);
        return { ...group, isFinished, thumbnailUrl };
      };

      const leaderProcessed = await Promise.all((data.leader || []).map(processGroup));
      const memberProcessed = await Promise.all((data.member || []).map(processGroup));

      const allGroups = [...leaderProcessed, ...memberProcessed];
      const activeGroups = allGroups.filter((g) => !g.isFinished);

      set({
        leaderGroups: leaderProcessed,
        memberGroups: memberProcessed,
        activeGroups,
        isLoadingGroups: false,
      });
    } catch (err) {
      console.error('그룹 정보 불러오기 실패:', err);
      set({
        leaderGroups: [],
        memberGroups: [],
        activeGroups: [],
        isLoadingGroups: false,
      });
    }
  },
}));
