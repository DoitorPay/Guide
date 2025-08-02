import { create } from 'zustand';

const useRouletteStore = create((set) => ({
  selectedPunishment: null,
  setSelectedPunishment: (value) => set({ selectedPunishment: value }),
}));

export default useRouletteStore;
