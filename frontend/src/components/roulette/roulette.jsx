import React, { useState } from 'react';
import Button from '@/components/button/button';
import Popup from '@/components/popupModal/Popup';

const Roulette = ({ items = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);

  const hasItems = items.length > 0;

  const spin = (current, speed, remaining) => {
    if (remaining <= 0) {
      setIsSpinning(false);
      setShowConfirmPopup(true);
      return;
    }

    const nextIndex = (current + 1) % items.length;
    setSelectedIndex(nextIndex);

    const nextSpeed = speed + 10;
    setTimeout(() => {
      spin(nextIndex, nextSpeed, remaining - 1);
    }, nextSpeed);
  };

  const handleSpin = () => {
    if (isSpinning || !hasItems) return;

    setIsSpinning(true);
    const totalSpins = 20 + Math.floor(Math.random() * 10);
    const startIndex = selectedIndex === null ? 0 : selectedIndex;
    spin(startIndex, 50, totalSpins);
  };

  const handleUseCard = () => {
    setShowConfirmPopup(false);
    setShowCompletePopup(true);
  };

  return (
    <div className="roulette-wrap">
      <div className="roulette-box">
        {!hasItems ? (
          <div className="roulette-default-text">
            수행해야 할 벌칙이 없어요.
          </div>
        ) : selectedIndex === null && !isSpinning ? (
          <div className="roulette-default-text">
            벌칙을 <span style={{ color: 'var(--color-red-vari-400)' }}>1</span>개 수행해야 해요. <br />
            룰렛을 돌려주세요!
          </div>
        ) : (
          items.map((item, idx) => {
            const isActive = idx === selectedIndex;
            return (
              <div
                key={idx}
                className={`roulette-item ${isActive ? 'active' : ''}`}
              >
                {item}
              </div>
            );
          })
        )}
      </div>

      <div>
        <Button
          type="primary"
          buttonName={
            !hasItems
              ? '룰렛 돌리기'
              : isSpinning
              ? '룰렛 돌리는 중...'
              : '룰렛 돌리기'
          }
          onClick={handleSpin}
          disabled={isSpinning || !hasItems}
          bgColor="var(--color-secondary-indigo)"
          aria="룰렛 돌리기 버튼"
        />
      </div>

      <Popup
        setPopup={showConfirmPopup}
        icon="error-gray"
        title="면제 카드를 사용하시겠습니까?"
        subtitle="벌칙을 수행하고 싶지 않으면 면제카드를 사용할 수 있어요."
        buttonName="건너뛰기"
        button2Name="사용"
        onClick={() => setShowConfirmPopup(false)}
        onSecondClick={handleUseCard}
      />

      <Popup
        setPopup={showCompletePopup}
        icon="done-gray"
        title="면제 카드를 사용했어요."
        subtitle="이번 벌칙은 넘어감? (멘트 필요)"
        buttonName="닫기"
        onClick={() => setShowCompletePopup(false)}
      />
    </div>
  );
};

export default Roulette;
