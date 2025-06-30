import React, { useState } from 'react';
import Button from '@/components/button';

const dummyItems = [
  '벌칙 내용',
  '벌칙 내용',
  '벌칙 내용',
  '벌칙 내용',
  '벌칙 내용',
];

const Roulette = () => {
  const [selectedIndex, setSelectedIndex] = useState(2);
  const [isSpinning, setIsSpinning] = useState(false);

  const spin = (current, speed, remaining) => {
    if (remaining <= 0) {
      setIsSpinning(false);
      return;
    }

    setSelectedIndex((current + 1) % dummyItems.length);

    const nextSpeed = speed + 10;
    setTimeout(() => {
      spin((current + 1) % dummyItems.length, nextSpeed, remaining - 1);
    }, nextSpeed);
  };

  const handleSpin = () => {
    if (isSpinning) return;

    setIsSpinning(true);
    // 결과 속도 지정 totalSpins 
    const totalSpins = 20 + Math.floor(Math.random() * 10);
    spin(selectedIndex, 50, totalSpins);
  };

  return (
    <div className="roulette-wrap">
      <div className="roulette-box">
        {dummyItems.map((item, idx) => {
          const isActive = idx === selectedIndex;
          return (
            <div
              key={idx}
              className={`roulette-item ${isActive ? 'active' : ''}`}
            >
              {item}
            </div>
          );
        })}
      </div>
      <div>
        <Button
          type="primary"
          buttonName={isSpinning ? '돌리는 중...' : '룰렛 돌리기'}
          onClick={handleSpin}
          disabled={isSpinning}
          aria="룰렛 돌리기 버튼"
        />
      </div>
    </div>
  );
};

export default Roulette;
