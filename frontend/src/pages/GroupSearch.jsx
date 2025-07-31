import React, { useState, useEffect } from 'react';
import MainLayout from "@/pages/MainLayout";
import GroupSearchInput from "@/components/group/GroupSearchInput";
import GroupCard from "@/components/group/GroupCard";

const junkGroups = [
  {
    id: 1,
    title: "프로젝트를드가",
    category: "개발, 공부",
    period: "2025.04.17 ~ 2025.06.17",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 2,
    title: "리액트 프로젝트",
    category: "개발, 공부",
    period: "2025.05.01 ~ 2025.07.31",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 3,
    title: "기획서의 정석",
    category: "기획, 공부",
    period: "2025.03.10 ~ 2025.05.10",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 4,
    title: "독서 모임 그룹",
    category: "문화, 독서",
    period: "2025.06.01 ~ 2025.08.31",
    image: "https://via.placeholder.com/300x200"
  },
  {
    id: 5,
    title: "주식 스터디 그룹",
    category: "경제, 투자",
    period: "2025.07.01 ~ 2025.09.30",
    image: "https://via.placeholder.com/300x200"
  },
];

const GroupSearch = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("latest"); // 'latest' 또는 'popularity', 'relate'
  const [allGroups, setAllGroups] = useState([]);
  const [filteredGroups, setFilteredGroups] = useState([]);

  // 추후 API연동 고려
  useEffect(() => {
    setAllGroups(junkGroups);
  }, []);

  // 검색어 또는 정렬 기준 변경 시 필터링 및 정렬
  useEffect(() => {
    let currentGroups = [...allGroups];

    // 검색어 필터링
    if (searchQuery) {
      currentGroups = currentGroups.filter(group =>
        group.title.includes(searchQuery) ||
        group.category.includes(searchQuery)
      );
    }

    // 정렬
    if (sortBy === "latest") {
      currentGroups.sort((a, b) => b.id - a.id); // 지금은 id값 순으로 정렬했지만 API연동시에 createAt을 받아온다면 그것을 기준으로 정렬
    } else if (sortBy === "popularity") {
      // 인기순은 DB에서 어떻게 구분할지 문의
    } else if (sortBy === "relate") {
        // 사용자 관심사와 연관지어서?
    }

    setFilteredGroups(currentGroups);
  }, [searchQuery, sortBy, allGroups]);

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  const handleSortChange = (sortOption) => {
    setSortBy(sortOption);
  };

  return (
    <MainLayout
      headerProps={{
        type: "header-b",
        title: "그룹 찾기",
        icon2: "arrow-left",
      }}
    >
      <div className="group-search-page-content">
        <GroupSearchInput onSearch={handleSearch} onSortChange={handleSortChange} />
        <div className="group-cards-container">
          {filteredGroups.length > 0 ? (
            filteredGroups.map(group => (
              <GroupCard
                key={group.id}
                title={group.title}
                category={group.category}
                period={group.period}
                image={group.image}
              />
            ))
          ) : (
            <p>검색 결과가 없습니다.</p>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default GroupSearch;
