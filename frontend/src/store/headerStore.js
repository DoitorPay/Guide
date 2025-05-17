import { create } from 'zustand';

const useStore = create((set) => ({
    // 헤더 상태
    headerType: 'default',
    headerIcon1: 'center-focus-strong',
    headerIcon2: 'center-focus-strong',
    headerTitle: '',
    
    // 헤더 액션
    setHeaderType: (type) => set({ headerType: type }),
    setHeaderIcon1: (icon) => set({ headerIcon1: icon }),
    setHeaderIcon2: (icon) => set({ headerIcon2: icon }),
    setHeaderTitle: (title) => set({ headerTitle: title }),
    
    // 헤더 이벤트 핸들러
    headerIcon1OnClick: () => {},
    headerIcon2OnClick: () => {},
    setHeaderIcon1OnClick: (callback) => set({ headerIcon1OnClick: callback }),
    setHeaderIcon2OnClick: (callback) => set({ headerIcon2OnClick: callback }),
}));

export default useStore;