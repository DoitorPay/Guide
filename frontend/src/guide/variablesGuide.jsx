import React from "react";

export default function VariablesGuide() {
  const variables = [
    ["--typo-size-heading-1", "34"],
    ["--typo-size-heading-2", "28"],
    ["--typo-size-heading-3", "25"],
    ["--typo-size-heading-4", "18"], 
    ["--typo-size-heading-6", "20"],
    ["--typo-size-body-1", "16"],
    ["--typo-size-body-3", "14"],
    ["--typo-size-body-5", "12"],
    ["--typo-size-btn-1", "16"],
    ["--typo-size-btn-2", "14"],
    ["--typo-line-height", "140"],
    ["--typo-weight-bold", "700"],
    ["--typo-weight-semibold", "600"],
    ["--typo-weight-medium", "500"],
  ];

  return (
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
            {variables.map(([name, value], i) => (
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
  );
}
