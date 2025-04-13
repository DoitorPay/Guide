import React, { useState } from 'react'

const Input = ({ label, placeholder, type = 'text', id, value, onChange }) => {
  const [isFocused, setIsFocused] = useState(false)

  const getBorderStyle = () => {
    if (!value) return '1px solid #e0e0e0' // 입력 전
    if (isFocused) return '2px solid #333' // 입력 중
    return '1px solid #e0e0e0' // 입력 완료
  }

  const getTextColor = () => {
    if (!value) return '#aaa'
    return '#000'
  }

  return (
    <div className="input-wrapper" style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
      {label && <label htmlFor={id} style={{ fontSize: '12px', color: '#888' }}>{label}</label>}
      <input
        id={id}
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          padding: '12px',
          borderRadius: '8px',
          border: getBorderStyle(),
          outline: 'none',
          backgroundColor: '#f9f9f9',
          color: getTextColor(),
          fontSize: '14px',
          transition: 'all 0.2s ease'
        }}
      />
    </div>
  )
}

export default Input
