import React from "react";

// 사용 방법
// color 추가 -> colors 배열에 name, code를 양식과 같이 추가합니다.

const colors = [
    { name: "Primary", code: "#000000" },
    { name: "Primary", code: "#000000" },
    { name: "Primary", code: "#000000" },
  ];

const ColorItem = ({ name, code }) => {
    const handleCopy = () => {
      navigator.clipboard.writeText(code);
      alert("복사되었습니다!");
    };

    return (
      <li
        style={{
          border: "1px solid #ddd",
          borderRadius: "4px",
          padding: "10px",
          textAlign: "center",
        }}
      >
        <div
          style={{
            backgroundColor: code,
            height: "40px",
            borderRadius: "4px",
            marginBottom: "8px",
            border: "1px solid #ccc",
          }}
        />
        <div>{name}</div>
        <div>{code}</div>
        <button
          onClick={handleCopy}
          style={{
            marginTop: "5px",
            padding: "4px 8px",
            fontSize: "12px",
            cursor: "pointer",
            border: "1px solid #aaa",
            borderRadius: "3px",
            background: "#f1f1f1",
          }}
        >
          복사
        </button>
      </li>
    );
  };

export default function ColorGuide() {
  return (
    <> 
    <div className="inner-wrap">
    <div className="pub-guide">
        <ul
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
            gap: "10px",
            listStyle: "none",
            padding: 0,
            margin: "15px 0",
          }}
        >
          {colors.map((color, i) => (
            <ColorItem key={i} name={color.name} code={color.code} />
          ))}
        </ul>
  </div>
  </div>
  </>
  );
}
