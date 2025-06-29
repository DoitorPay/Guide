import React from 'react';
import { Link } from 'react-router-dom';
import { format, startOfWeek, endOfWeek } from 'date-fns';
import { ko } from 'date-fns/locale';

const SubTitle = ({ title, type = 'default', desc, link }) => {
  // eslint-disable-next-line no-unused-vars
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
            전체보기
            <img src="/icons/arrow-right-gray.svg" alt="arrow" />
            </Link>
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
