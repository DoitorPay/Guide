import { create } from 'zustand';
import axios from 'axios';

export const useUserStore = create((set) => ({
  userId: null,
  profile: '',
  nickname: '',
  isLoading: false,

  userInfo: null,

  fetchUserInfo: async () => {
    set({ isLoading: true });
    try {
      const res = await axios.get('http://localhost:8000/api/user/user_properties', {
        withCredentials: true,
      });

      // 서버 응답이 배열이면 첫 번째 요소를 사용
      const user = Array.isArray(res.data) ? res.data[0] : res.data;

      if (user) {
        set({
          userId: user.id,
          profile: user.profile,
          nickname: user.nickname,
          
          userInfo: user, 
          
          isLoading: false,
        });
      } else {
        // 유저 정보가 없는 경우 초기화
        throw new Error('User data is null or undefined');
      }

    } catch (err) {
      console.error('유저 정보 불러오기 실패:', err);
      set({
        userId: null,
        profile: '',
        nickname: '',
        userInfo: null, 
        isLoading: false,
      });
    }
  },
}));