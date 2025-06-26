import React from 'react';
import { Link } from 'react-router-dom';
import { format } from 'date-fns';
import { ko } from 'date-fns/locale';

const SubTitle = ({ title, type = 'default', desc, link }) => {
  const today = format(new Date(), 'MM월 dd일', { locale: ko });

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

      {type === 'desc' && desc && (
        <p className="sub-title__desc">{desc}</p>
      )}
    </div>
  );
};

export default SubTitle;
