import React from "react";
import MainLayout from "@/pages/MainLayout";
import HeartProfile from "@/components/profile/heartProfile";
import PunishmentContent from "@/components/card/PunishmentContent";

const PenaltyCertification = () => {
  const dummyProfile = {
    avatar: "https://picsum.photos/100", 
    user: "김재림", 
    date: "2025-07-20T10:00:00", 
    liked: true,
    likeCount: 8,
  };

  return (
    <MainLayout
      headerProps={{
        title: "ㅤ",
        type: "header-b",
        icon1: "arrow-left",
      }}
    >
      <div className="punishment-image-box">
        <img
          src="https://picsum.photos/350/350"
          alt="벌칙 인증 이미지"
          style={{ width: "100%", height: "350px", borderRadius: "4px", objectFit: "cover" }}
        />
      </div>

      <HeartProfile
        avatar={dummyProfile.avatar}
        user={dummyProfile.user}
        date={dummyProfile.date}
        liked={dummyProfile.liked}
        likeCount={dummyProfile.likeCount}
      />

      <PunishmentContent />
    </MainLayout>
  );
};

export default PenaltyCertification;
