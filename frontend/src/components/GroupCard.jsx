import React from 'react';

const GroupCard = ({
  title = '토익 뽀개기 그룹',
  members = 8,
  category = '토익, 공부',
  period = '2025.04.17 ~ 2025.06.17',
  progress = 50,
  deadline = '5월 20일'
}) => {
  return (
    <div className="group-card" style={{
      backgroundColor: '#3F617D',
      color: '#fff',
      padding: '20px',
      borderRadius: '12px',
      width: '300px',
      position: 'relative'
    }}>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <h3 style={{ fontSize: '16px', fontWeight: 'bold' }}>{title}</h3>
        <span>{'>'}</span>
      </div>

      <div style={{ margin: '12px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
        <div style={{ display: 'flex' }}>
          <div className="avatar-group">
            <span className="avatar" style={{
              width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#ccc'
            }}></span>
            <span className="avatar" style={{
              width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#bbb', marginLeft: '-8px'
            }}></span>
            <span className="avatar" style={{
              width: '24px', height: '24px', borderRadius: '50%', backgroundColor: '#aaa', marginLeft: '-8px'
            }}></span>
          </div>
          <span style={{
            fontSize: '12px',
            backgroundColor: '#fff',
            color: '#3F617D',
            borderRadius: '12px',
            padding: '0 6px',
            fontWeight: 'bold',
            marginLeft: '4px'
          }}>+{members - 3}</span>
        </div>
        <span style={{ fontSize: '14px' }}>멤버 {members}명</span>
      </div>

      <div style={{ fontSize: '13px', lineHeight: '1.6' }}>
        <div><strong>카테고리</strong> | {category}</div>
        <div><strong>그룹 기간</strong> | {period}</div>
      </div>

      <div style={{
        marginTop: '16px',
        display: 'flex',
        justifyContent: 'space-between',
        backgroundColor: '#fff',
        color: '#3F617D',
        borderRadius: '10px',
        padding: '10px'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px' }}>미션 진행율</div>
          <div style={{ fontWeight: 'bold', fontSize: '18px' }}>{progress}%</div>
        </div>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: '12px' }}>미션 마감일</div>
          <div style={{ fontWeight: 'bold', fontSize: '16px' }}>{deadline}</div>
        </div>
      </div>
    </div>
  );
};

export default GroupCard;
