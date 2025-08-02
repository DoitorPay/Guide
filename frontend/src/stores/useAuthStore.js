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

      console.log('[checkLoginStatus] 응답 데이터:', res.data);

      const data = res.data;

      if (data && typeof data === 'object' && data.id) {
        set({
          user: data,
          isLoggedIn: true,
          isAuthLoading: false,
        });
      }
      else if (data === true) {
        set({
          user: { id: 'anonymous' }, 
          isLoggedIn: true,
          isAuthLoading: false,
        });
      }
      else {
        set({
          user: null,
          isLoggedIn: false,
          isAuthLoading: false,
        });
      }
    } catch (err) {
      console.error('[checkLoginStatus] 에러:', err);
      set({
        user: null,
        isLoggedIn: false,
        isAuthLoading: false,
      });
    }
  },

  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useAuthStore;
