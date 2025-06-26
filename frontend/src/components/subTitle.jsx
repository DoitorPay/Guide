import React from 'react';
import { Link } from 'react-router-dom';

const SubTitle = ({ title, type = 'default', desc, link }) => {
  return (
    <div className={`sub-title sub-title--${type}`}>
      <div className="sub-title__row">
        <h2 className="sub-title__heading">{title}</h2>
        {type === 'link' && link && (
          <Link to={link} className="sub-title__link">
            전체보기
            <img src="/icons/arrow-right-gray.svg"/>
          </Link>
        )}
      </div>
      {type === 'desc' && desc && (
        <p className="sub-title__desc">{desc}</p>
      )}
    </div>
  );
};

export default SubTitle;
