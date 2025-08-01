import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  userId: null,
  profileImage: '',
  nickname: '',
  fetchUserInfo: async () => {
    const res = await axios.get('http://localhost:8000/user/info', { withCredentials: true });
    set({
      userId: res.data.id,
      profileImage: res.data.profile,
      nickname: res.data.nickname,
    });
  },
}));
