import React from 'react';

const ProfileName = ({ name, size = 'md', link = null }) => {
  const content = <span className={`profile-name ${size}`}>{name}</span>;

  return link ? (
    <a href={link} className="profile-name-link">
      {content}
    </a>
  ) : (
    content
  );
};

export default ProfileName;
