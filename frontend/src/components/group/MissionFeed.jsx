import React from "react";
import ProfileImage from "@/components/Profile/ProfileImage";

const MissionFeed = ({ feeds = [] }) => {
  if (!feeds.length) return <p>등록된 인증 피드가 없습니다.</p>;

  return (
    <div className="mission-feed-grid">
      {feeds.map((feed) => (
        <div key={feed.id} className="mission-feed-item">
          <img src={feed.image} alt="인증 이미지" className="feed-image" />
          <div className="feed-footer">
            <ProfileImage src={feed.avatar} size={24} />
            <span className="feed-username">{feed.user}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MissionFeed;
