import { create } from 'zustand';
import axios from 'axios';

const useAuthStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  isAuthLoading: true,

  checkLoginStatus: async () => {
    try {
      const res = await axios.get('http://localhost:8000/auth/check-login', {
        withCredentials: true,
      });

      if (res.data && res.data.id) {
        set({ user: res.data, isLoggedIn: true, isAuthLoading: false });
      } else {
        set({ user: null, isLoggedIn: false, isAuthLoading: false });
      }
    } catch (err) {
      console.error('로그인 확인 실패:', err);
      set({ user: null, isLoggedIn: false, isAuthLoading: false });
    }
  },

  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;