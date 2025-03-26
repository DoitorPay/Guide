import React, { useEffect, useState}  from "react"
import { Link } from "react-router-dom";
import '@/assets/css/Guide.scss'

function PubGuide() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/ia.json")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);
  return (
      <div className="inner-wrap">
        <div className="pub-guide">
          <h1>퍼블리싱 목록</h1>
          <ul>
            {items.map((item) => (
              <li key={item.id}>
                <h3>
                  <Link to={item.path}>{item.title}</Link>
                </h3>
                <span>파일명: {item.fileName}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
  )
}

export default PubGuide;
