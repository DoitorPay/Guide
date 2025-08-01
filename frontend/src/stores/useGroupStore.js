import { create } from 'zustand';
import axios from 'axios';

export const useGroupStore = create((set) => ({
  groupList: [],
  selectedGroup: null,

  fetchGroupList: async () => {
    try {
      const res = await axios.get('http://localhost:8000/group');
          console.log('받은 그룹 데이터:', res.data); 
      set({ groupList: res.data });
    } catch (err) {
      console.error('전체 그룹 데이터 불러오기 실패:', err);
    }
  },

  setSelectedGroup: async (group) => {
  set({ selectedGroup: group });
}

}));
