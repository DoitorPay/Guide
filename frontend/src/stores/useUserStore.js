import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  userId: null,
  profile: '',
  nickname: '',
  isLoading: false,

  fetchUserInfo: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('http://localhost:8000/user/user_properties', { withCredentials: true });

      console.log('백엔드 응답:', res.data);

      set({
        userId: res.data.id,
        profile: res.data.profile || '',
        nickname: res.data.nickname || '',
        isLoading: false,
      });
    } catch (err) {
      console.error('유저 정보 불러오기 실패:', err);
      set({
        userId: null,
        profile: '',
        nickname: '',
        isLoading: false,
      });
    }
  },
}));
