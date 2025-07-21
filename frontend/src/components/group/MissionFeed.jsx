import React from "react";
import ProfileImage from "@/components/Profile/ProfileImage";
import UserProfileRow from "@/components/profile/UserProfileRow";

const MissionFeed = ({ feeds = [] }) => {
  if (!feeds.length) return <p>등록된 인증 피드가 없습니다.</p>;

  return (
    <div className="mission-feed-grid horizontal-scroll--tight">
      {feeds.map((feed) => (
        <div key={feed.id} className="mission-feed-item">
          <img src={feed.image} alt="인증 이미지" className="feed-image" />
          <div className="feed-footer">
            <UserProfileRow
              name={feed.user}
              src={feed.avatar}
              date={feed.date}
              variant="postMeta"
              size={46}
              nameWeight = "semibold"
            />
          </div>
        </div>
      ))}
    </div>
  );
};

export default MissionFeed;
