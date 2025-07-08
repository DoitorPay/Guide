import React, { useState } from 'react';
import Button from '@/components/button/button';

const Roulette = ({ items = [] }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [isSpinning, setIsSpinning] = useState(false);

  const hasItems = items.length > 0;

  const spin = (current, speed, remaining) => {
    if (remaining <= 0) {
      setIsSpinning(false);
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
    </div>
  );
};

export default Roulette;
