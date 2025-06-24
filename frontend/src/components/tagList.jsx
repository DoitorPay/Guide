import React, { useState } from "react";


const TagList = ({ tags = [] }) => {
  const [activeTags, setActiveTags] = useState([]);

  const toggleTag = (tag) => {
    setActiveTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
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
