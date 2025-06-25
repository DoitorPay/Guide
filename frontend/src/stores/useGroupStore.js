import { create } from 'zustand';
import axios from 'axios';

const useGroupStore = create((set) => ({
  groupData: null,
  feeds: [],
  members: [],
  activeTab: '활동',
  setActiveTab: (tab) => set({ activeTab: tab }),

  fetchGroupData: async () => {
    // API 엔드포인트 받아와야함
    const res = await axios.get('/api/group/1');
    set({ groupData: res.data });
  },
  fetchFeeds: async () => {
    const res = await axios.get('/api/group/1/feeds');
    set({ feeds: res.data });
  },
  fetchMembers: async () => {
    const res = await axios.get('/api/group/1/members');
    set({ members: res.data });
  }
}));

export default useGroupStore;