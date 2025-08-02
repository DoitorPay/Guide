import { create } from 'zustand';
import useAuthStore from './useAuthStore'; 

export const useUserStore = create((set) => ({
  userId: null,
  profile: '',
  nickname: '',
  isLoading: false,
  userInfo: null,

  fetchUserInfo: async () => {
    await useAuthStore.getState().checkLoginStatus();
  },
}));