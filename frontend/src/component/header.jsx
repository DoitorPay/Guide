// Header.jsx
import React from "react";
import { Link } from "react-router-dom";
import "../assets/css/Header.scss";

function Header() {
  return (
    <>
      <div>
        <header>
          <ul>
            <div>
              <li className="header-title">
                <Link to="/">Do it or Pay</Link>
              </li>
            </div>
            <div className="header-menu">
              <li>
                <Link to="/frontGuide">코딩 가이드</Link>
              </li>
              <li>
                <Link to="/cssGuide">스타일 가이드</Link>
              </li>
              <li>
                <Link to="/cmpguide">컴포넌트</Link>
              </li>
              <li>
                <Link to="/pubGuide">퍼블리싱 목록</Link>
              </li>
            </div>
          </ul>
        </header>
      </div>
    </>
  );
}

export default Header;
