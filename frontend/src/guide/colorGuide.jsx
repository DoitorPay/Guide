import React from "react";

const sections = [
  {
    title: "Primary & Secondary",
    colors: [
      { name: "Primary", code: "#F05A39" },
      { name: "Secondary Sapphire", code: "#9AD7D2" },
      { name: "Secondary Navy", code: "#4D6375" },
      { name: "Secondary Indigo", code: "#1A2933" },
    ],
  },
  {
    title: "Gray Scale",
    colors: [
      { name: "White", code: "#FFFFFF" },
      { name: "Gray 50", code: "#F1F1F1" },
      { name: "Gray 100", code: "#E5E5E5" },
      { name: "Gray 200", code: "#CBCBCB" },
      { name: "Gray 300", code: "#B2B2B2" },
      { name: "Gray 400", code: "#989898" },
      { name: "Gray 500", code: "#7F7F7F" },
      { name: "Gray 600", code: "#656565" },
      { name: "Gray 700", code: "#4C4C4C" },
      { name: "Gray 800", code: "#323232" },
      { name: "Black", code: "#000000" },
    ],
  },
  {
    title: "Red Variants",
    colors: [
      { name: "Red 50", code: "#FEEFEB" },
      { name: "Red 100", code: "#FACCC2" },
      { name: "Red 200", code: "#F8B3A4" },
      { name: "Red 300", code: "#F5907A" },
      { name: "Red 400", code: "#F37B61" },
      { name: "Red 500", code: "#F05A39" },
      { name: "Red 600", code: "#DA5234" },
      { name: "Red 700", code: "#AA4028" },
      { name: "Red 800", code: "#84321F" },
      { name: "Red 900", code: "#652618" },
    ],
  },
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
    <div className="inner-wrap">
      <div className="pub-guide">
        {sections.map((section, idx) => (
          <div key={idx} style={{ marginBottom: "30px" }}>
            <h3 style={{ marginBottom: "10px", borderBottom: "1px solid #ccc", paddingBottom: "4px" }}>
              {section.title}
            </h3>
            <ul
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fill, minmax(180px, 1fr))",
                gap: "10px",
                listStyle: "none",
                padding: 0,
                margin: 0,
              }}
            >
              {section.colors.map((color, i) => (
                <ColorItem key={i} name={color.name} code={color.code} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
