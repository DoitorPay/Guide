import React, { useState } from "react";

const TagList = ({ tags = [], onChange }) => {
  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (tag) => {
    const updatedTags = activeTags.includes(tag)
      ? activeTags.filter((t) => t !== tag)
      : [...activeTags, tag];

    setActiveTags(updatedTags);
    onChange?.(updatedTags);
  };

  return (
    <ul className="tag-wrapper">
      {tags.map((tag, index) => (
        <li
          key={index}
          className={`tag ${activeTags.includes(tag) ? "active" : ""}`}
          onClick={() => toggleTag(tag)}
        >
          {tag}
        </li>
      ))}
    </ul>
  );
};

export default TagList;
