import React, { useState } from 'react';
import Checkbox from '@/components/Checkbox';

const CheckboxDemo = () => {
  const [isChecked, setIsChecked] = useState(false);

  return (
    <div style={{ padding: '32px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '16px' }}>
      <Checkbox checked={isChecked} onChange={setIsChecked} />
      <div style={{ fontSize: '18px', fontWeight: '600' }}>
        {isChecked ? '체크됨' : '체크안됨'}
      </div>
    </div>
  );
};

export default CheckboxDemo;
