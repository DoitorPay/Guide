import { create } from 'zustand';
import axios from 'axios';
import { useUserStore } from './useUserStore';

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isAuthLoading: true,

  checkLoginStatus: async () => {
    try {
      const resCheck = await axios.get('http://localhost:8000/auth/check-login', {
        withCredentials: true,
      });

      if (resCheck.data === true) {
        const resUser = await axios.get('http://localhost:8000/api/user/user_properties', {
          withCredentials: true,
        });
        const user = Array.isArray(resUser.data) ? resUser.data[0] : resUser.data;
        if (user && user.id) {
          set({ user, isLoggedIn: true, isAuthLoading: false });
          useUserStore.setState({ userInfo: user, userId: user.id, nickname: user.nickname, profile: user.profile, isLoading: false });
        } else {
          throw new Error('로그인 상태이나 유저 정보를 가져오지 못했습니다.');
        }
      } else {
        set({ user: null, isLoggedIn: false, isAuthLoading: false });
        useUserStore.setState({ userInfo: null, userId: null, nickname: '', profile: '', isLoading: false });
      }
    } catch (err) {
      console.error('[checkLoginStatus] 에러:', err);
      set({ user: null, isLoggedIn: false, isAuthLoading: false });
      useUserStore.setState({ userInfo: null, userId: null, nickname: '', profile: '', isLoading: false });
    }
  },

  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => {
    set({ user: null, isLoggedIn: false });
    useUserStore.setState({ userInfo: null, userId: null, nickname: '', profile: '', isLoading: false });
  },
}));

export default useAuthStore;