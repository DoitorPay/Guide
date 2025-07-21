import React, { useState, useEffect } from "react";
import UserProfileRow from "@/components/Profile/UserProfileRow";
import MissionFeed from "@/components/Group/MissionFeed";
import MainLayout from "@/pages/MainLayout";
import MyRanking from "@/components/ranking/MyRanking";
import RankingList from "@/components/ranking/RankingList";
import SubTitle from "@/components/subtitle/subTitle";
import TodoList from "@/components/todo/todoList";
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

  const myInfo = {
  name: "가나",
  progress: 32,
  rank: 6,
};

  const feeds = [
    {
      id: 1,
      user: "닉네임",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
      date: "2025-07-21T10:00:00Z",
    },
    {
      id: 2,
      user: "유진",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
      date: "2025-07-11T10:00:00Z",
    },
    {
      id: 3,
      user: "유진",
      image: "https://picsum.photos/300",
      avatar: "https://picsum.photos/30/30",
      date: "2025-07-11T10:00:00Z",
    },
  ];

  const members = [
    { id: 1, name: "가나", avatar: "https://picsum.photos/40/40",progress: 80, isLeader: true  },
    { id: 2, name: "마바", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 3, name: "사아", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 4, name: "자차", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 5, name: "카타", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 6, name: "하허", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 7, name: "ABC", avatar: "https://picsum.photos/40/40",progress: 80  },
    { id: 8, name: "XYZ", avatar: "https://picsum.photos/40/40",progress: 80  },
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
      <div className="hero-image full-bleed">
        <img src={groupData.thumbnailUrl} alt="그룹 이미지" />
        <div className="gradient"></div>
      </div>

      <div className="group-info full-bleed">
        <SubTitle title={groupData.title} type="title-lg" />
        <div className="group-meta">
           <div className="meta-item">
            <span className="label">카테고리</span>
            <span className="value"> | {groupData.category}</span>
          </div>
          <div className="meta-item">
            <span className="label">그룹 설명</span>
            <span className="value"> | {groupData.info}</span>
          </div>
          <div className="meta-item">
            <span className="label">그룹 기간</span>
            <span className="value"> | {groupData.period}</span>
          </div>
        </div>
      </div>

      <div className="tabs full-bleed">
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

          <SubTitle
            title="이번주 그룹 미션"
            type="sideinfo"
            info={groupData.period}
            desc="5일 21시간 34분 남음"
          />
          {/* desc 들어갈 정보 나중에 바꿔야함 */}
      <TodoList type="group-detail" />
<div className="group-section">
  <SubTitle title="미션 인증 피드" />
      <MissionFeed feeds={feeds} />
   </div>



      <div className="group-section">
      <SubTitle title={`멤버(${groupData.memberCount})`} />
            <div className="horizontal-scroll">
              {members.map((member) => (
                <UserProfileRow
                  key={member.id}
                  variant="vertical"
                  size={60}
                  src={member.avatar}
                  name={member.name}
                  border
                  isLeader={member.isLeader}
                />
              ))}
            </div>
      </div>

  </>
)}

{activeTab === "랭킹" && (
  <div className="ranking-section">
    <MyRanking {...myInfo} />
    <RankingList rankings={members} />
  </div>
)}

      </div>
    </div>
        </MainLayout>
  );
};

export default GroupDetail;
