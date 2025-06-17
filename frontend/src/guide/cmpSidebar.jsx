import React, { useState } from "react";
// 컴포넌트 목록
import Input from "@/components/input";
import CmpButton from "@/guide/cmpButton"
import Login from "@/pages/login";
import CmpHeader from "@/guide/cmpHeader";
import MainLayout from "@/pages/mainLayout";
import Navigation from "@/components/nav"; 
import CheckboxDemo from "@/components/CheckboxDemo";
import RouletteComponent from "@/components/roulette";
import CmpTodoList from "@/guide/cmpTodoList";

const itemList = [
  { id: 3, name: "버튼", path: "@/guide/cmpButton", component: <CmpButton /> },
  { id: 4, name: "로그인", path: "@/pages/login", component: <Login /> },
  { id: 5, name: "Input", path: "@/components/input", component: <Input /> },
  { id: 6, name: "레이아웃", path: "@/pages/mainLayout", component: <MainLayout /> },
  { id: 7, name: "네비게이션", path: "@/components/nav", component: <Navigation /> },
  { id: 8, name: "체크박스", path: "@/components/Checkbox", component: <CheckboxDemo /> },
  { id: 9, name: "룰렛", path: "@/components/roulette", component: <RouletteComponent /> },
  { id: 10, name: "헤더", path: "@/guide/cmpHeader", component: <CmpHeader />},
  { id: 11, name: "투두리스트", path: "@/components/todoList", component: <CmpTodoList />}
  // { id: 9, name: "회원가입", path: "@/pages/SignUp", component: <SignUp /> },
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
