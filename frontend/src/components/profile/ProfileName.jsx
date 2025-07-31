import React from 'react';

const ProfileName = ({ name, size = 'md', weight = 'default', link = null }) => {
  const content = (
    <span className={`profile-name ${size} weight-${weight}`}>
      {name}
    </span>
  );

  return link ? (
    <a href={link} className="profile-name-link">
      {content}
    </a>
  ) : (
    content
  );
};

export default ProfileName;
