import React, { useState } from 'react';
import { Wheel } from 'react-custom-roulette';

const RouletteComponent = () => {
  const [options, setOptions] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [mustSpin, setMustSpin] = useState(false);
  const [prizeNumber, setPrizeNumber] = useState(0);

  // 기본 더미 데이터 (입력값 없을 때 보여줄용)
  const defaultData = [
    { option: '옵션을 입력하세요' },
    { option: '추가해주세요' },
  ];

  const handleAddOption = () => {
    if (inputValue.trim() === '') return;
    setOptions([...options, { option: inputValue }]);
    setInputValue('');
  };

  const handleSpinClick = () => {
    const dataToUse = options.length > 0 ? options : defaultData;
    const newPrizeNumber = Math.floor(Math.random() * dataToUse.length);
    setPrizeNumber(newPrizeNumber);
    setMustSpin(true);
  };

  const dataToUse = options.length > 0 ? options : defaultData;

  return (
    <div style={{ textAlign: 'center', marginTop: '50px' }}>
      <div style={{ marginBottom: '20px' }}>
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="옵션을 입력하세요"
        />
        <button onClick={handleAddOption} style={{ marginLeft: '10px' }}>
          추가
        </button>
      </div>

      <Wheel
        mustStartSpinning={mustSpin}
        prizeNumber={prizeNumber}
        data={dataToUse}
        backgroundColors={['#3e3e3e', '#df3428']}
        textColors={['#ffffff']}
        onStopSpinning={() => {
          setMustSpin(false);
          if (options.length > 0) {
            alert(`🎉 당첨: ${dataToUse[prizeNumber].option}`);
          }
        }}
      />

      <button onClick={handleSpinClick} style={{ marginTop: '30px' }}>
        룰렛 돌리기
      </button>
    </div>
  );
};

export default RouletteComponent;
