import React, { useState } from "react";
// 컴포넌트 목록
import Header from "@/components/header";
import Footer from "@/components/footer";
import Input from "@/components/input";
import CmpButton from "@/guide/cmpButton"
import Login from "@/pages/login";
import KaKaoLoginRedirectButton from "@/components/kakaoButton.jsx";

const itemList = [
  { id: 1, name: "헤더", path: "@/components/header", component: <Header /> },
  { id: 2, name: "푸터", path: "@/components/footer", component: <Footer /> },
  { id: 3, name: "buttonItem", path: "@/guide/cmpButton", component: <CmpButton /> },
  { id: 4, name: "로그인", path: "@/pages/login", component: <Login /> },
  { id: 5, name: "Input", path: "@/components/input", component: <Input /> },
  { id: 6, name: "kakao", path: "@/components/kakao", component: <KaKaoLoginRedirectButton /> }
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
