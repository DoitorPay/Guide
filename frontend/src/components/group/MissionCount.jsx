import React, { useState } from "react";
import Input from "@/components/input/Input";

const MissionCount = () => {
  const [value, setValue] = useState(1);

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue > 5) {
        alert("최대 5까지만 입력할 수 있습니다.");
        return;
      }
      setValue(Math.max(1, newValue));
    } else {
      setValue("");
    }
  };

  const increment = () => {
    if (value < 5) {
      setValue(prev => prev + 1);
    } else {
      alert("최대 5까지만 가능합니다.");
    }
  };

  const decrement = () => {
    if (value > 1) {
      setValue(prev => prev - 1);
    }
  };

  return (
    <div className="stepper-container">
      <button className="stepper-btn" onClick={decrement}>
        <img src="/icons/remove.svg" alt="minus-icon" />
      </button>

      <Input
        label=""
        name="stepper"
        value={value}
        onChange={handleChange}
        type="number"
        placeholder=""
        maxLength={1}
        className="stepper-input"
      />

      <button className="stepper-btn" onClick={increment}>
        <img src="/icons/add.svg" alt="plus-icon" />
      </button>
    </div>
  );
};

export default MissionCount;
