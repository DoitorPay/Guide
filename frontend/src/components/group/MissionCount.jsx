import React from "react";
import Input from "@/components/input/Input";

const MissionCount = ({ label = "그룹 목표 개수", subtitle = "설정가능한 목표 개수는 최대 5개입니다.", required = "true", name, onChange, value }) => {

  const handleChange = (e) => {
    const newValue = parseInt(e.target.value);
    if (!isNaN(newValue)) {
      if (newValue > 5) {
        alert("최대 5까지만 입력할 수 있습니다.");
        return;
      }
      onChange({ target: { name: 'missionCount', value: Math.max(1, newValue) } });
    } else {
      onChange({ target: { name: 'missionCount', value: "" } });
    }
  };

  const increment = (e) => {
    if (value < 5) {
      e.preventDefault();
      onChange({ target: { name: 'missionCount', value: value + 1 } });
    } else {
      alert("최대 5까지만 가능합니다.");
    }
  };

  const decrement = (e) => {
    if (value > 1) {
      e.preventDefault();
      onChange({ target: { name: 'missionCount', value: value - 1 } });
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
