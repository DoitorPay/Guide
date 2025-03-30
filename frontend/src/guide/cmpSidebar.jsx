import React, { useState } from "react";
import "@/assets/css/cmp.scss";
// 컴포넌트 목록
import Header from "@/components/header";
import Footer from "@/components/footer";
import Button from "@/components/button";
import Todo from "@/components/todo";

const itemList = [
  { id: 1, name: "헤더", path: "@/components/header", component: <Header /> },
  { id: 2, name: "푸터", path: "@/components/footer", component: <Footer /> },
  { id: 3, name: "buttonItem", path: "@/components/button", component: <Button buttonName="Button" aria="테스트버튼" /> },
  { id: 4, name: "todoBox", path: "@/components/todo", component: <Todo /> },
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
