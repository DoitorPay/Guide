import React from "react";
import { useLocation } from "react-router-dom";
import MainLayout from "@/pages/MainLayout";
import HeartProfile from "@/components/profile/heartProfile";
import PunishmentContent from "@/components/card/PunishmentContent";
import { useUserStore } from "@/stores/useUserStore";

const PenaltyCertification = () => {
  const location = useLocation();
  // 이전 페이지에서 navigate state로 넘겨준 벌칙 정보를 받음
  const { penalty } = location.state || {};
  
  // 현재 로그인한 유저 정보를 가져옴 (작성자 정보로 사용)
  const { userInfo } = useUserStore();

  if (!penalty || !userInfo) {
    // 데이터가 없는 경우를 대비한 예외 처리
    return (
      <MainLayout
        headerProps={{
          title: "오류",
          type: "header-b",
          icon1: 'arrow-left-gray', // 뒤로가기 아이콘
        }}
      >
        <p style={{textAlign: 'center', marginTop: '2rem'}}>벌칙 정보를 불러올 수 없습니다.</p>
      </MainLayout>
    );
  }

  return (
    <MainLayout
      headerProps={{
        title: "ㅤ", // 비워두면 PunishmentContent의 제목이 보임
        type: "header-b",
        icon1: 'arrow-left-gray', // 뒤로가기 아이콘
      }}
    >
      <div className="punishment-image-box">
        {/* TODO: 백엔드에서 이미지 주소를 제공해야 함 */}
        <img
          src="https://picsum.photos/350/350" // 임시 이미지
          alt="벌칙 인증 이미지"
          style={{ width: "100%", height: "350px", borderRadius: "4px", objectFit: "cover" }}
        />
      </div>

      <HeartProfile
        avatar={userInfo.profile || "https://picsum.photos/100"}
        user={userInfo.nickname}
        date={penalty.deadline} // punish_history에 있는 날짜 정보 사용
        // TODO: 백엔드에서 좋아요 정보를 제공해야 함
        liked={false} // 임시 데이터
        likeCount={0} // 임시 데이터
      />

      <PunishmentContent 
        title={penalty.title}
        content={penalty.content}
      />
    </MainLayout>
  );
};

export default PenaltyCertification;