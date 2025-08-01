import { create } from 'zustand';

const useProfileStore = create((set) => ({
  user: null,
  isLoggedIn: false,

  // 요청 보낼 시 로그인 되어 있는지 확인
  

  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useProfileStore;