import React from "react";
import MissionFeed from "@/components/group/MissionFeed";

const sampleFeeds = [
  {
    id: 1,
     image: "https://picsum.photos/300",
    user: "닉네임",
    avatar: "https://source.unsplash.com/random/46x46?face1",
    date: new Date().toISOString(),
  },
  {
    id: 2,
    image: "https://picsum.photos/300",
    user: "유진",
    date: new Date(Date.now() - 864000000).toISOString(),
  },
  {
    id: 3,
     image: "https://picsum.photos/300",
    user: "ㅇㅇ",
 avatar: "https://picsum.photos/30",
    date: new Date(Date.now() - 3600000).toISOString(),
  },
];

const MissionFeedGuide = () => {
  return (
    <div style={{ backgroundColor: '#f5f5f5', padding: '16px'}}>
        <p>받는거 : Feed (id, image, User, avatar, date) </p>
      <MissionFeed feeds={sampleFeeds} />
    </div>
  );
};

export default MissionFeedGuide;
