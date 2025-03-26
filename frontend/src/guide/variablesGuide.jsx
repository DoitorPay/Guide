import React from "react";

// 사용 방법
// Variables 추가 -> 214줄 tbody 밑 배열에 변수명, 값을 추가합니다.

export default function VariablesGuide() {
  return (
    <>
     <div className="inner-wrap">
      <div className="pub-guide">
        <table
          style={{
            width: "100%",
            borderCollapse: "collapse",
            marginTop: "10px",
          }}
        >
          <thead>
            <tr style={{ background: "#f1f1f1" }}>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                변수명
              </th>
              <th style={{ border: "1px solid #ccc", padding: "8px" }}>
                값
              </th>
            </tr>
          </thead>
          <tbody>
            {[
              ["$primary-color", "#000000"],
              ["$primary-color", "#000000"],
              ["$primary-color", "#000000"],
              ["$primary-color", "#000000"],
              ["$primary-color", "#000000"],
            ].map(([name, value], i) => (
              <tr key={i}>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {name}
                </td>
                <td style={{ border: "1px solid #ccc", padding: "8px" }}>
                  {value}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </>
  );
}
