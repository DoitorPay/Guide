import React from 'react';
import { Link } from 'react-router-dom';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';

const SubTitle = ({
  title,
  type = 'default',
  desc,
  link,
  info,
  linkIcon = 'arrow-right-gray',
  more = '전체보기',
  onClickMore,
  date,
  groupStartDate,
}) => {
  const currentDate = new Date();
  const today = format(currentDate, 'M월 d일', { locale: ko });

  // 그룹 시작 날짜가 있으면 해당 날짜를 기준으로, 없으면 현재 날짜를 기준으로 주차 계산
  const baseDate = groupStartDate ? new Date(groupStartDate) : currentDate;
  
  const weekStart = startOfWeek(baseDate, { weekStartsOn: 1, locale: ko });
  const weekEnd = endOfWeek(baseDate, { weekStartsOn: 1, locale: ko });
  const week = `${format(weekStart, 'M월 d일', { locale: ko })} ~ ${format(weekEnd, 'M월 d일', { locale: ko })}`;

  // 그룹 기준 주차 계산
  const getGroupWeek = () => {
    if (!groupStartDate) return week;
    
    const startDate = new Date(groupStartDate);
    const currentDate = new Date();
    
    // 그룹 시작일부터 현재까지의 일수 계산
    const daysDiff = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));
    const weeksDiff = Math.floor(daysDiff / 7);
    
    // 현재 주차의 시작과 끝 날짜 계산 (그룹 시작일부터 정확히 7일씩)
    const currentWeekStart = new Date(startDate);
    currentWeekStart.setDate(startDate.getDate() + (weeksDiff * 7));
    
    const currentWeekEnd = new Date(currentWeekStart);
    currentWeekEnd.setDate(currentWeekStart.getDate() + 6);
    
    return `${format(currentWeekStart, 'M월 d일', { locale: ko })} ~ ${format(currentWeekEnd, 'M월 d일', { locale: ko })}`;
  };

  return (
    <div className={`sub-title sub-title--${type}`}>
    {type === 'title-lg' ? (
        <h2 className="sub-title__heading --title-lg">{title}</h2>
      ) : type !== 'sideinfo' && (
        <h2 className="sub-title__heading">{title}</h2>
      )}

      {type === 'link' && link && (
        <Link to={link} className="sub-title__link" onClick={onClickMore}>
          {more}
          <img src={`/icons/${linkIcon}.svg`} alt="link-icon" />
        </Link>
      )}

      {type === 'info' && info && (
        <span className="sub-title__info">{info}</span>
      )}

      {type === 'date' && (
        <span className="sub-title__date">{date ? format(date, 'M월 d일', { locale: ko }) : today}</span>
      )}

      {type === 'week' && (
        <span className="sub-title__date">{getGroupWeek()}</span>
      )}

      {type === 'desc' && desc && (
        <p className="sub-title__desc">{desc}</p>
      )}
      
      {type === 'title-lg' && (
        <h2 className="sub-title__heading --title-lg"></h2>
        )}

     {type === 'sideinfo' && (
  <div className="sub-title__wrap">
    <h2 className="sub-title__heading">{title}</h2>
    <div className="sub-title__meta-row">
      <span className="sub-title__date-range">{info}</span>
      <span className="sub-title__remain-time">{desc}</span>
    </div>
  </div>
)}

    </div>
  );
};

export default SubTitle;
