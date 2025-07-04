import React, { useState } from "react";
// 컴포넌트 목록
import Input from "@/components/input";
import CmpButton from "@/guide/cmpButton"
import Login from "@/pages/login";
import CmpHeader from "@/guide/cmpHeader";
import MainLayout from "@/pages/mainLayout";
import Navigation from "@/components/nav"; 
import CheckboxDemo from "@/guide/CheckboxDemo";
import Roulette from "@/components/roulette";
import TagGuide from "@/guide/tagGuide";
import CmpTodoList from "@/guide/cmpTodoList";
import CalendarGuide from '@/guide/calendarGuide';
import ProfileGuide from "@/guide/cmpProfile";
import GroupCardDemo from "@/guide/GroupCardDemo";
import HomeProfile from "@/components/homeProfile";
import ProgressCard from "@/components/progressCard";
import SubTitleGuide from "@/guide/subTitleGuide";

const itemList = [
  { id: 3, name: "버튼", path: "@/guide/cmpButton", component: <CmpButton /> },
  { id: 4, name: "로그인", path: "@/pages/login", component: <Login /> },
  { id: 5, name: "텍스트 필드", path: "@/components/input", component: <Input /> },
  { id: 6, name: "레이아웃", path: "@/pages/mainLayout", component: <MainLayout /> },
  { id: 7, name: "네비게이션", path: "@/components/nav", component: <Navigation /> },
  { id: 8, name: "체크박스", path: "@/components/Checkbox", component: <CheckboxDemo /> },
  { id: 9, name: "룰렛", path: "@/components/roulette", component: <Roulette/> },
  { id: 10, name: "헤더", path: "@/guide/cmpHeader", component: <CmpHeader />},
  { id: 11, name: "태그", path: "@/guide/tagGuide", component: <TagGuide />},
  { id: 12, name: "투두리스트", path: "@/components/todoList", component: <CmpTodoList />},
  { id: 13, name: "캘린더", path: "@/guide/calendarGuide", component: <CalendarGuide />},
  { id: 14, name: "프로필", path: "@/guide/cmpProfile", component: <ProfileGuide />},
  { id: 15, name: "그룹 카드", path: "@/guide/GroupCardDemo", component: <GroupCardDemo />},
  { id: 16, name: "오늘 큰 전진입니다~", path: "@/components/homeProfile", component: <HomeProfile />},
  { id: 17, name: "오늘의 진행 상황", path: "@/components/progressCard", component: <ProgressCard />},
  { id: 18, name: "서브 타이틀", path: "@/guide/subTitleGuide", component: <SubTitleGuide />},
];

export default function CmpSidebar() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div className="inner-wrap cmp-sidebar">
      <div className="cmp-sidebar__itemList">
        <ul>
          {itemList.map((item) => (
            <li key={item.id} onClick={() => setSelectedItem(item)}>
              {item.name}
            </li>
          ))}
        </ul>
      </div>

      <div className="cmp-sidebar__components">
        {selectedItem ? (
          <>
            <h3>{selectedItem.name}</h3>
            <p className="cmp-channel">📂 경로: {selectedItem.path}</p>
            {selectedItem.component}
          </>
        ) : (
          <p>컴포넌트를 선택하세요.</p>
        )}
      </div>
    </div>
  );
}
