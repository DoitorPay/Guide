import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import HeartProfile from "@/components/profile/heartProfile";
import PunishmentContent from "@/components/card/PunishmentContent";
import useAuthStore from "@/stores/useAuthStore";

const PenaltyCertification = () => {
  const location = useLocation();
  const penalty = location.state?.penalty;
  
  const { user } = useAuthStore();

  if (!penalty || !user) {
    return (
      <MainLayout
        headerProps={{
          title: "잘못된 접근",
          type: "header-b",
          icon1: 'arrow-left-gray',
        }}
      >
        <p style={{textAlign: 'center', padding: 'clamp(20px, 5vw, 40px)'}}>
          잘못된 접근이거나, 페이지를 새로고침하여 정보가 사라졌습니다.
          <br />
          벌칙 히스토리 페이지로 돌아가 다시 시도해주세요.
        </p>
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
        avatar={user.profile || "https://picsum.photos/100"}
        user={user.nickname}
        date={penalty.deadline}
        liked={false}
        likeCount={0}
      />
      
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