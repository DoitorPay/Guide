import React, { useState } from "react";
import Input from "@/components/input/Input";

const MissionCount = ({
  label = "그룹 목표 개수",
  subtitle = "설정가능한 목표 개수는 최대 5개입니다.",
  required = "true",
  name
}) => {
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
      <label htmlFor={name} className="input-label">
        {label}
        {required && <span style={{ color: 'red' }}> *</span>}
        <p className="subtitle">{subtitle}</p>
      </label>

      <div className="stepper-wrap">
        <button 
          className={`stepper-btn ${value === 1 ? 'disabled' : ''}`}
          onClick={decrement}>
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

        <button
          className={`stepper-btn ${value === 5 ? 'disabled' : ''}`}
          onClick={increment}
        >
          <img src="/icons/add.svg" alt="plus-icon" />
        </button>
      </div>

    </div>
  );
};

export default MissionCount;
