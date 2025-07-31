import { create } from 'zustand';
import axios from 'axios';
import ProfileImage from '@/components/profile/ProfileImage';

export const useUserStore = create((set) => ({
  profileImage: '',
  fetchProfileImage: async () => {
    try {
      const res = await axios.get('http://localhost:8000/user/profile_img', {
        withCredentials: true,
      });
      set({ profileImage: res.data.profile });
    } catch (err) {
      console.error('프로필 이미지 불러오기 실패:', err);
    }
  },
}));