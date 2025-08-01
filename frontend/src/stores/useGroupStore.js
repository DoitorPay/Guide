import { create } from 'zustand';
import axios from 'axios';

export const useGroupStore = create((set) => ({
  groups: [],
  fetchGroupsForUser: async (userId) => {
    try {
      const res = await axios.get('http://localhost:8000/group');
      const allGroups = res.data;

      const filteredGroups = allGroups.filter(group =>
        group.members.some(member => member.id === userId)
      );

      set({ groups: filteredGroups });
    } catch (err) {
      console.error('그룹 데이터 불러오기 실패:', err);
    }
  },
}));
