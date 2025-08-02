import { create } from 'zustand';
import axios from 'axios';
import { useUserStore } from './useUserStore';

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isAuthLoading: true,

  checkLoginStatus: async () => {
    set({ isAuthLoading: true });
    try {
      const res = await axios.get('http://localhost:8000/auth/check-login', {
        withCredentials: true,
      });

      const data = res.data;
      let userData = null;
      let loggedInStatus = false;

      if (data && typeof data === 'object' && data.id) {
        userData = data;
        loggedInStatus = true;
      } else if (data === true) {
        userData = { id: 'anonymous' };
        loggedInStatus = true;
      }

      set({
        user: userData,
        isLoggedIn: loggedInStatus,
        isAuthLoading: false,
      });

      useUserStore.setState({
        userInfo: userData,
        userId: userData?.id,
        nickname: userData?.nickname,
        profile: userData?.profile,
        isLoading: false,
      });

    } catch (err) {
      console.error('[checkLoginStatus] 에러:', err);
      // 1. useAuthStore 자신의 상태를 업데이트
      set({
        user: null,
        isLoggedIn: false,
        isAuthLoading: false,
      });
      // 2. [핵심] useUserStore의 상태도 똑같이 업데이트
      useUserStore.setState({
        userInfo: null,
        userId: null,
        nickname: '',
        profile: '',
        isLoading: false,
      });
    }
  },

  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;