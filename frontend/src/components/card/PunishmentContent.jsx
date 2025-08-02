import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import HeartProfile from "@/components/profile/heartProfile";
import PunishmentContent from "@/components/card/PunishmentContent";
import { useUserStore } from "@/stores/useUserStore";

const PenaltyCertification = () => {
  const location = useLocation();
  const { penalty } = location.state || {};
  
  const { userInfo } = useUserStore();

  if (!penalty || !userInfo) {
    return (
      <MainLayout
        headerProps={{
          title: "오류",
          type: "header-b",
          icon1: 'arrow-left-gray',
        }}
      >
        <p style={{textAlign: 'center', marginTop: '2rem'}}>벌칙 정보를 불러올 수 없습니다.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      headerProps={{
        title: "ㅤ",
        type: "header-b",
        icon1: 'arrow-left-gray',
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
        avatar={userInfo.profile || "https://picsum.photos/100"}
        user={userInfo.nickname}
        date={penalty.deadline}
        liked={false}
        likeCount={0}
      />

      {/* [핵심 수정] groupName과 deadline prop을 추가로 전달 */}
      <PunishmentContent 
        title={penalty.title}
        content={penalty.content}
        groupName={penalty.groupName}
        deadline={penalty.deadline}
      />
    </MainLayout>
  );
};

export default PenaltyCertification;