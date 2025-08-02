import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  userId: null,
  profile: '',
  nickname: '',
  quote: '',
  sns: '',
  interest: [],
  todo: [],
  total_xp: 0,
  isLoading: false,

  fetchUserInfo: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('http://localhost:8000/api/user/user_properties', {
        withCredentials: true,
      });

      const user = Array.isArray(res.data) ? res.data[0] : res.data;

      set({
        userId: user?.id || null,
        profile: user?.profile || '',
        nickname: user?.nickname || '',
        quote: user?.quote || '',
        sns: user?.sns || '',
        interest: user?.interest || [],
        todo: user?.todo || [],
        total_xp: user?.total_xp || 0,
        isLoading: false,
      });
    } catch (err) {
      console.error('유저 정보 불러오기 실패:', err);
      set({
        userId: null,
        profile: '',
        nickname: '',
        quote: '',
        sns: '',
        interest: [],
        todo: [],
        total_xp: 0,
        isLoading: false,
      });
    }
  },
}));
