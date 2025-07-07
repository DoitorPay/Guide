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
  more = '전체보기'
}) => {
  const currentDate = new Date();
  const today = format(currentDate, 'M월 d일', { locale: ko });

  const weekStart = startOfWeek(currentDate, { weekStartsOn: 1, locale: ko });
  const weekEnd = endOfWeek(currentDate, { weekStartsOn: 1, locale: ko });
  const week = `${format(weekStart, 'M월 d일', { locale: ko })} ~ ${format(weekEnd, 'M월 d일', { locale: ko })}`;

  return (
    <div className={`sub-title sub-title--${type}`}>
      <h2 className="sub-title__heading">{title}</h2>

      {type === 'link' && link && (
        <Link to={link} className="sub-title__link">
          {more}
          <img src={`/icons/${linkIcon}.svg`} alt="link-icon" />
        </Link>
      )}

      {type === 'info' && info && (
        <span className="sub-title__info">{info}</span>
      )}

      {type === 'date' && (
        <span className="sub-title__date">{today}</span>
      )}

      {type === 'week' && (
        <span className="sub-title__date">{week}</span>
      )}

      {type === 'desc' && desc && (
        <p className="sub-title__desc">{desc}</p>
      )}
    </div>
  );
};

export default SubTitle;
