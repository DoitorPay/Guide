import { create } from 'zustand';

const useProfileStore = create((set) => ({
  user: null,
  isLoggedIn: false,
  

  setUser: (user) => set({ user, isLoggedIn: true }),
  logout: () => set({ user: null, isLoggedIn: false }),
}));

export default useProfileStore;