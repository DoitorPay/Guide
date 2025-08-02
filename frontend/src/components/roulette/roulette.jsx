import React, { useState, useEffect } from 'react';
import Button from '@/components/button/button';
import Popup from '@/components/popupModal/Popup';

const Roulette = ({ punishList = [], onSpinRequest }) => {
  const [items, setItems] = useState([]);
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const [showCompletePopup, setShowCompletePopup] = useState(false);
  const [finalPenalty, setFinalPenalty] = useState(null);

  useEffect(() => {
    setItems(punishList);
    setSelectedIndex(null);
  }, [punishList]);

  const spin = (current, speed, remaining) => {
    if (remaining <= 0) {
      setIsSpinning(false);
      setShowConfirmPopup(true);
      return;
    }
    const nextIndex = (current + 1) % items.length;
    setSelectedIndex(nextIndex);
    const nextSpeed = remaining < items.length ? speed + 25 : speed;
    setTimeout(() => {
      spin(nextIndex, nextSpeed, remaining - 1);
    }, nextSpeed);
  };

  const handleSpin = async () => {
    if (isSpinning || items.length === 0 || !onSpinRequest) return;
    setIsSpinning(true);

    const targetPenaltyName = await onSpinRequest();

    if (targetPenaltyName) {
      const targetIndex = items.findIndex(item => item.title === targetPenaltyName);
      if (targetIndex !== -1) {
        setFinalPenalty(items[targetIndex]);
        const currentIdx = selectedIndex === null ? 0 : selectedIndex;
        const extraSpins = items.length * 2;
        const stepsToTarget = (targetIndex - currentIdx + items.length) % items.length;
        const totalSteps = extraSpins + stepsToTarget;
        spin(currentIdx, 50, totalSteps);
      } else {
        alert("벌칙을 찾을 수 없습니다.");
        setIsSpinning(false);
      }
    } else {
      setIsSpinning(false);
    }
  };

  const handleUseCard = () => {
    setShowConfirmPopup(false);
    setShowCompletePopup(true);
  };

  const handleSkip = () => {
    setShowConfirmPopup(false);
  };

  return (
    <div className="roulette-wrap">
      <div className="roulette-box">
        {items.length === 0 ? (
          <div className="roulette-default-text">
            먼저 그룹을 선택해주세요.
          </div>
        ) : selectedIndex === null && !isSpinning ? (
          <div className="roulette-default-text">
            벌칙을 <span style={{ color: 'var(--color-red-vari-400)' }}>1</span>개 수행해야 해요. <br />
            룰렛을 돌려주세요!
          </div>
        ) : (
          items.map((item, idx) => (
            <div key={idx} className={`roulette-item ${idx === selectedIndex ? 'active' : ''}`}>
              {item.title}
            </div>
          ))
        )}
      </div>

      <div>
        <Button
          type="primary"
          buttonName={isSpinning ? '룰렛 돌리는 중...' : '룰렛 돌리기'}
          onClick={handleSpin}
          disabled={isSpinning || items.length === 0}
          bgColor="var(--color-secondary-indigo)"
          aria="룰렛 돌리기 버튼"
        />
      </div>

      <Popup
        setPopup={showConfirmPopup}
        icon="error-gray"
        title="면제 카드를 사용하시겠습니까?"
        subtitle={`벌칙 당첨: ${finalPenalty?.title || ''}`}
        buttonName="수행"
        button2Name="사용"
        onClick={handleSkip}
        onSecondClick={handleUseCard}
      />

      <Popup
        setPopup={showCompletePopup}
        icon="done-gray"
        title="면제 카드를 사용했어요."
        subtitle="이번 벌칙은 면제되었어요!"
        buttonName="닫기"
        onClick={() => setShowCompletePopup(false)}
      />
    </div>
  );
};

export default Roulette;