import { create } from 'zustand';
import axios from 'axios';

// 여기는 group search store
// 이 스토어는 db 전체 group 데이터를 가져와서 검색할 수 있게 할 예정


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
