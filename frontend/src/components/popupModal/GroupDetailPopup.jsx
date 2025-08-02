import React, { useState, useEffect } from 'react';
import Button from '@/components/button/Button';
import Popup from '@/components/popupModal/Popup';
import axios from 'axios';
import { useUserStore } from '@/stores/useUserStore';
import { useUserGroupStore } from '@/stores/useUserGroupStore';

const GroupDetailPopup = ({ group, setPopup, onClose, onJoin }) => {
  const userId = useUserStore((state) => state.userId);
  const memberGroups = useUserGroupStore((state) => state.memberGroups);
  const leaderGroups = useUserGroupStore((state) => state.leaderGroups);

  const [isMember, setIsMember] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);

  const { fetchUserGroups } = useUserGroupStore();

  useEffect(() => {
    if (group && group.gid) {
      const groupId = String(group.gid);
      const allJoinedGids = [
        ...memberGroups.map(g => String(g.gid)),
        ...leaderGroups.map(g => String(g.gid))
      ];
      setIsMember(allJoinedGids.includes(groupId));
    }
  }, [group, memberGroups, leaderGroups]);

 const handleJoin = async () => {
  try {
     const res = await axios.put(
      `http://localhost:8000/group/register?id=${group.gid}`,
      {},
      { withCredentials: true }
    );

    console.log('가입 성공:', res);

    await fetchUserGroups();  
    setShowConfirm(true);
  } catch (error) {
    console.error('그룹 가입 실패:', error);
  }
};

  if (!group) return null;

  const {
    name,
    category,
    time_created,
    end_date,
    todo = [],
    thumbnail = 'https://picsum.photos/400/300',
  } = group;

  return (
    <>
      {setPopup && (
        <div className="popup">
          <div className="popup__container group-detail-popup">
            <button className="popup__close-btn" onClick={onClose} aria-label="닫기">
              <img src="/icons/clear-white.svg" alt="닫기" />
            </button>

            <div className="group-detail__thumbnail">
              <img src={thumbnail} alt="그룹 썸네일" />
            </div>

            <div className="group-detail__content">
              <h2 className="group-detail__title">{name}</h2>

              <div className="group-detail__meta">
                <p>카테고리 | {category}</p>
                <p>
                  그룹 기간 | {time_created?.split('T')[0]} ~ {end_date?.split('T')[0]}
                </p>
              </div>

              <div className="group-detail__mission-box">
                <p className="group-detail__mission-title">진행 중인 미션</p>
                <ol className="group-detail__mission-list">
                  {todo.length > 0
                    ? todo.map((mission, idx) => <li key={idx}>{mission}</li>)
                    : <li>등록된 미션이 없습니다</li>}
                </ol>
              </div>

              <div className="group-detail__button">
                <Button
                  type="primary"
                  buttonName={isMember ? '가입완료' : '그룹 가입하기'}
                  disabled={isMember}
                  onClick={isMember ? undefined : handleJoin}
                />
              </div>
            </div>
          </div>

          <div className="overlay" onClick={onClose}></div>
        </div>
      )}

      {showConfirm && (
        <Popup
          icon="done-gray.svg"
          title={`${group?.name} 그룹에 가입하셨습니다.`}
          subtitle="그룹탭에서 확인할 수 있어요."
          buttonName="확인"
          onClick={() => setShowConfirm(false)}
        />
      )}
    </>
  );
};

export default GroupDetailPopup;
