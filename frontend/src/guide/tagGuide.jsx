import TagList from "@/components/tag/tagList";
import React from "react";

const TagGuide = () => {
    return (
      <div>
        <TagList tags={['수능 공부', '과제', '디자인', '코딩', '토익', '오픽', '토플', '리트', '자격증', '취준', '자기계발', '독서']} />
      </div>
    );
  };
  
  export default TagGuide;