import React from "react";

const rules = [
    {
      title: "의미있고 읽기 쉬운 클래스 및 아이디 이름 사용",
      code: `// 👎 Bad
.cls-1 { color: red; }
// 👍 Good
.error-message { color: red; }`,
    },
    {
      title: "모든 속성 정의 끝에 세미콜론(;) 사용",
      code: `// 👎 Bad
.example {
  color: red
  background: yellow
}
// 👍 Good
.example {
  color: red;
  background: yellow;
}`,
    },
    {
      title: "논리적인 순서로 속성 정렬",
      code: `// 👎 Bad
.example {
  border: 1px solid black;
  color: red;
  background: yellow;
}
// 👍 Good
.example {
  color: red;
  background: yellow;
  border: 1px solid black;
}`,
    },
    {
      title: "0 값에는 단위를 생략",
      code: `// 👎 Bad
.example {
  margin: 0px;
}
// 👍 Good
.example {
  margin: 0;
}`,
    },
    {
      title: "필요할 경우 주석 추가",
      code: `// 👎 Bad
.example {
  color: red;
  background: yellow; // setting background
}
// 👍 Good
// error message styles
.example {
  color: red;
  background: yellow;
}`,
    },
  ];

export default function StyleGuide() {
  return (
    <> 
    <div className="inner-wrap">
    <div className="pub-guide">
      <div>
        <ul
          style={{
            border: "1px solid #bdbdbd",
            padding: "15px",
            borderRadius: "5px",
            margin: "10px 0 0 0",
          }}
        >
          {rules.map((rule, idx) => (
            <li key={idx} style={{ marginBottom: "10px" }}>
              <div style={{ fontWeight: "bold", marginBottom: "4px" }}>
                {rule.title}
              </div>
              <div className="code-wrap">
                <pre>
                  <code>{rule.code}</code>
                </pre>
              </div>
            </li>
          ))}
        </ul>
      </div>
  </div>
  </div>
  </>
  );
}
