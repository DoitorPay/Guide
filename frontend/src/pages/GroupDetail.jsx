import React, { useState, useEffect } from "react";
import UserProfileRow from "@/components/Profile/UserProfileRow";
import MissionFeed from "@/components/Group/MissionFeed";
import MainLayout from "@/pages/MainLayout";
// import useGroupStore from '@/stores/useGroupStore';

const GroupDetail = () => {
  const [activeTab, setActiveTab] = useState("활동");

//  임시 데이터 
  const groupData = {
    title: "토익 뽀개기 그룹",
    category: "토익, 공부",
    period: "2025.04.17 ~ 2025.06.17",
    info:"토익 점수를 올리기 위한 그룹입니다. 매주 미션을 수행하고 인증 피드를 올려주세요.",
    thumbnailUrl: "https://picsum.photos/400/300",
    memberCount: 8,
  };

  const feeds = [
    {
      id: 1,
      user: "닉네임",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
    },
    {
      id: 2,
      user: "닉네임",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
    },
  ];

  const members = [
    { id: 1, name: "가나다라", avatar: "https://picsum.photos/40/40" },
    { id: 2, name: "마바", avatar: "https://picsum.photos/40/40" },
    { id: 3, name: "사아", avatar: "https://picsum.photos/40/40" },
    { id: 4, name: "자차", avatar: "https://picsum.photos/40/40" },
    { id: 5, name: "카타", avatar: "https://picsum.photos/40/40" },
    { id: 6, name: "하허", avatar: "https://picsum.photos/40/40" },
    { id: 7, name: "ABC", avatar: "https://picsum.photos/40/40" },
    { id: 8, name: "XYZ", avatar: "https://picsum.photos/40/40" },
  ];

  // // 실제 데이터 사용 시 주석 해제
  // const { groupData, feeds, members, fetchGroupData, fetchFeeds, fetchMembers } = useGroupStore();
  // useEffect(() => {
  //   fetchGroupData();
  //   fetchFeeds();
  //   fetchMembers();
  // }, [fetchGroupData, fetchFeeds, fetchMembers]);

  return (
    <MainLayout
    contentBg="var(--color-background)"
          headerProps={{
            title: "그룹 상세",
            type: "header-b",
          }}
        >

          <div className="group-detail-page">
      <div className="hero-image">
        <img src={groupData.thumbnailUrl} alt="그룹 이미지" />
      </div>

      <div className="group-info">
        <h1 className="group-title">{groupData.title}</h1>
        <div className="group-meta">
          <span className="category">카테고리 | {groupData.category}</span>
          <span className="info">그룹 설명 | {groupData.info}</span>
          <span className="period">그룹 기간 | {groupData.period}</span>
        </div>
      </div>

      <div className="tabs">
        <button
          className={`tab ${activeTab === "활동" ? "active" : ""}`}
          onClick={() => setActiveTab("활동")}
        >
          활동
        </button>
        <button
          className={`tab ${activeTab === "랭킹" ? "active" : ""}`}
          onClick={() => setActiveTab("랭킹")}
        >
          랭킹
        </button>
      </div>

      <div className="tab-content">
        {activeTab === "활동" && (
          <>
            <div className="section">
              <h3 className="section-title">이번주 그룹 미션</h3>
              {/* todolist cmp */}
            </div>

            <div className="section">
              <h3 className="section-title">미션 인증 피드</h3>
              <MissionFeed feeds={feeds} />
            </div>

            <div className="section">
              <h3 className="section-title">멤버({groupData.memberCount})</h3>
              <div className="horizontal-scroll">
                {members.map((member) => (
                  <UserProfileRow
                    key={member.id}
                    variant="vertical"
                    src={member.avatar}
                    name={member.name}
                  />
                ))}
              </div>
            </div>
          </>
        )}

        {activeTab === "랭킹" && (
          <div className="section">
            <h3 className="section-title">랭킹 시스템</h3>
          </div>
        )}
      </div>
    </div>
        </MainLayout>
  );
};

export default GroupDetail;
