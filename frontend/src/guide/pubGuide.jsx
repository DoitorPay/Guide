import React, { useEffect, useState}  from "react"
import { Link } from "react-router-dom";

function PubGuide() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    fetch("/ia.json")
      .then((response) => response.json())
      .then((data) => setItems(data))
      .catch((error) => console.error("데이터 불러오기 실패:", error));
  }, []);
  return (
      <div>
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <Link to={item.path}>{item.title}</Link>
            <span>파일명: {item.fileName}</span>
          </li>
        ))}
      </ul>
      </div>
  )
}

export default PubGuide;
