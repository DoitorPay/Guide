import React, { useState, useEffect } from "react";
import { useParams } from 'react-router-dom';
import axios from "axios";
import UserProfileRow from "@/components/Profile/UserProfileRow";
import MissionFeed from "@/components/Group/MissionFeed";
import MainLayout from "@/pages/MainLayout";
import MyRanking from "@/components/ranking/MyRanking";
import RankingList from "@/components/ranking/RankingList";
import SubTitle from "@/components/subtitle/subTitle";
import TodoList from "@/components/todo/todoList";

const GroupDetail = () => {
  const [activeTab, setActiveTab] = useState("활동");
  const { gid } = useParams();
  const [groupData, setGroupData] = useState(null);

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
  ];

  const members = [
    { id: 1, name: "가나", avatar: "https://picsum.photos/40/40", progress: 80, isLeader: true },
    { id: 2, name: "마바", avatar: "https://picsum.photos/40/40", progress: 80 },
    { id: 3, name: "사아", avatar: "https://picsum.photos/40/40", progress: 80 },
    { id: 4, name: "자차", avatar: "https://picsum.photos/40/40", progress: 80 },
    { id: 5, name: "카타", avatar: "https://picsum.photos/40/40", progress: 80 },
    { id: 6, name: "하허", avatar: "https://picsum.photos/40/40", progress: 80 },
    { id: 7, name: "ABC", avatar: "https://picsum.photos/40/40", progress: 80 },
    { id: 8, name: "XYZ", avatar: "https://picsum.photos/40/40", progress: 80 },
  ];

  useEffect(() => {
  const fetchGroupData = async () => {
    try {
      const res = await axios.get(`http://localhost:8000/group?id=${gid}`);
      const data = res.data;

      if (!data || typeof data !== 'object') {
        console.error("그룹 데이터가 올바르지 않음:", data);
        return;
      }

      setGroupData({
        title: data.name,
        category: data.category,
        period: `${data.time_created?.split('T')[0]} ~ ${data.end_date?.split('T')[0]}`,
        info: data.description,
        thumbnailUrl: "https://picsum.photos/400/300",
        memberCount: data.member_count,
        todos: data.todo,
        punishments: data.punish,
        members: data.members || [],
      });
    } catch (err) {
      console.error("그룹 정보 불러오기 실패:", err);
    }
  };

  fetchGroupData();
}, [gid]);


  if (!groupData) return <p>로딩 중...</p>;

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
                desc="5일 21시간 34분 남음" // ← 나중에 실제 계산으로 대체
              />

              <TodoList type="group-detail" todos={groupData.todos} />

              <div className="group-section">
                <SubTitle title="미션 인증 피드" />
                <MissionFeed feeds={feeds} />
              </div>

              <div className="group-section">
                <SubTitle title={`멤버(${groupData.memberCount})`} />
                <div className="horizontal-scroll">
                  {groupData.members.map((member, idx) => (
                    <UserProfileRow
                      key={member.id}
                      variant="vertical"
                      size={60}
                      src={member.profile || `https://i.pravatar.cc/60?img=${idx + 1}`}
                      name={member.nickname}
                      border
                      isLeader={idx === 0}
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
