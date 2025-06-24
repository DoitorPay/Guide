import React from "react";

const sections = [
  {
    title: "Primary & Secondary",
    colors: [
      { name: "Primary", code: "#F05A39", variable: "--color-primary" },
      { name: "Secondary Sapphire", code: "#9AD7D2", variable: "--color-secondary-sapphire" },
      { name: "Secondary Navy", code: "#4D6375", variable: "--color-secondary-navy" },
      { name: "Secondary Indigo", code: "#1A2933", variable: "--color-secondary-indigo" },
    ],
  },
  {
    title: "Background",
    colors: [
      { name: "Light Gray", code: "#F8F8F8", variable: "--color-background" },
    ]
  },
  {
    title: "Gray Scale",
    colors: [
      { name: "White", code: "#FFFFFF", variable: "--color-gray-scale-white" },
      { name: "Gray 50", code: "#F1F1F1", variable: "--color-gray-scale-50" },
      { name: "Gray 100", code: "#E5E5E5", variable: "--color-gray-scale-100" },
      { name: "Gray 200", code: "#CBCBCB", variable: "--color-gray-scale-200" },
      { name: "Gray 300", code: "#B2B2B2", variable: "--color-gray-scale-300" },
      { name: "Gray 400", code: "#989898", variable: "--color-gray-scale-400" },
      { name: "Gray 500", code: "#7F7F7F", variable: "--color-gray-scale-500" },
      { name: "Gray 600", code: "#656565", variable: "--color-gray-scale-600" },
      { name: "Gray 700", code: "#4C4C4C", variable: "--color-gray-scale-700" },
      { name: "Gray 800", code: "#323232", variable: "--color-gray-scale-800" },
      { name: "Black", code: "#000000", variable: "--color-gray-scale-black" },
    ],
  },
  {
    title: "Red Variants",
    colors: [
      { name: "Red 50", code: "#FEEFEB", variable: "--color-red-vari-50" },
      { name: "Red 100", code: "#FACCC2", variable: "--color-red-vari-100" },
      { name: "Red 200", code: "#F8B3A4", variable: "--color-red-vari-200" },
      { name: "Red 300", code: "#F5907A", variable: "--color-red-vari-300" },
      { name: "Red 400", code: "#F37B61", variable: "--color-red-vari-400" },
      { name: "Red 500", code: "#F05A39", variable: "--color-red-vari-500" },
      { name: "Red 600", code: "#DA5234", variable: "--color-red-vari-600" },
      { name: "Red 700", code: "#AA4028", variable: "--color-red-vari-700" },
      { name: "Red 800", code: "#84321F", variable: "--color-red-vari-800" },
      { name: "Red 900", code: "#652618", variable: "--color-red-vari-900" },
    ],
  },
  {
    title: "Navy Variants",
    colors: [
      { name: "navy 50", code: "#EDEFF1", variable: "--color-navy-vari-50" },
      { name: "navy 100", code: "#C8CFD4", variable: "--color-navy-vari-100" },
      { name: "navy 200", code: "#ADB7C0", variable: "--color-navy-vari-200" },
      { name: "navy 300", code: "#8896A3", variable: "--color-navy-vari-300" },
      { name: "navy 400", code: "#718291", variable: "--color-navy-vari-400" },
      { name: "navy 600", code: "#465A6A", variable: "--color-navy-vari-600" },
      { name: "navy 700", code: "#374653", variable: "--color-navy-vari-700" },
      { name: "navy 800", code: "#2A3640", variable: "--color-navy-vari-800" },
      { name: "navy 900", code: "#202A31", variable: "--color-navy-vari-900" },
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
                <ColorItem key={i} name={color.name} code={color.code} variable={color.variable} />
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
