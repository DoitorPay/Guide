import { create } from 'zustand';
import { useUserGroupStore } from './useUserGroupStore';

const usePenaltyStore = create((set) => ({
  penalties: [],
  // 백엔드에서 인증된 벌칙 목록 + 그룹 정보의 전체 벌칙 목록을 합쳐서 상태를 만드는 함수
  fetchPenalties: async () => {
    try {
      // 1. 내가 속한 그룹들이 가진 모든 벌칙 목록 가져오기 (미인증 상태가 기본)
      const { activeGroups } = useUserGroupStore.getState();
      const allPossiblePenalties = activeGroups.flatMap(group =>
        (group.punish || []).map(p => ({
          title: p,
          groupName: group.name,
          groupId: group.gid,
          deadline: group.end_date?.split('T')[0] || '',
          isCertified: false, // 기본값은 '미인증'
        }))
      );

      // 2. 백엔드에서 내가 '인증 완료한' 벌칙 목록 가져오기
      const response = await fetch('http://localhost:8000/api/user/punishFeed', {
        credentials: 'include', // 세션 쿠키 전송을 위해 필수
      });

      if (!response.ok) {
        throw new Error('벌칙 인증 내역 조회 실패');
      }
      const certifiedHistory = await response.json(); // [{ punish, gid, ... }]

      // 3. 두 목록을 비교해서 인증된 항목의 isCertified 상태를 true로 변경
      const mergedPenalties = allPossiblePenalties.map(penalty => {
        const isCertified = certifiedHistory.some(
          history => history.punish === penalty.title && history.gid === penalty.groupId
        );
        return { ...penalty, isCertified };
      });

      set({ penalties: mergedPenalties });

    } catch (error) {
      console.error("벌칙 목록 업데이트 실패:", error);
      set({ penalties: [] });
    }
  },
}));

export default usePenaltyStore;