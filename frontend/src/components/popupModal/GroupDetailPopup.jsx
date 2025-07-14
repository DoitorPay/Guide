import React from 'react';
import Button from '@/components/button/Button';

const GroupDetailPopup = ({ setPopup, onJoin }) => {
  return (
    <div className="popup">
      <div className="popup__container group-detail-popup">
 
        <button className="popup__close-btn" onClick={() => setPopup(false)} aria-label="닫기">
          <img src="/icons/clear.svg" alt="닫기" />
        </button>

        <div className="group-detail__thumbnail">
          <img src="https://picsum.photos/400/300" alt="그룹 썸네일" />
        </div>

        <div className="group-detail__content">
          <h2 className="group-detail__title">토익 뽀개기 그룹</h2>

          <div className="group-detail__meta">
            <p>카테고리 | 토익, 공부</p>
            <p>그룹 기간 | 2025.04.17 ~ 2025.06.17</p>
            <p>참여 시작일 | 2025.05.28부터 참여</p>
          </div>

          <div className="group-detail__mission-box">
            <p className="group-detail__mission-title">진행 중인 미션</p>
            <ul className="group-detail__mission-list">
              <li>1. 미션 1</li>
              <li>2. 길 때는 엔터 길 때는 엔터 길 때는 엔터 길 때는 엔터</li>
              <li>3. 미션 1</li>
            </ul>
          </div>

          <div className="group-detail__button">
            <Button
              type="primary"
              buttonName="그룹 가입하기"
              onClick={onJoin}
              aria="그룹 가입 버튼"
            />
          </div>
        </div>
      </div>

      <div className="overlay" onClick={() => setPopup(false)}></div>
    </div>
  );
};

export default GroupDetailPopup;
