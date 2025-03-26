import React, { useState } from "react";

function FrontGuide() {
  return (
    <div className="inner-wrap">
      <div className="pub-guide">
      <h1>Conding Guide</h1>
        <h2>Frontend</h2>
        <ul style={{border:'1px solid #bdbdbd', padding: '15px', borderRadius: '5px', margin: '10px 0 0 0'}}>
          <li>문장 종료 시 세미콜론(;)을 반드시 사용한다.</li>
          <li>변수, 함수명은 Camel case로 진행한다.</li>
          <li>
            상수는 영문 대문자 스네이크 표기법을 사용한다.
            <div className="code-wrap">SYMBOLIC_CONSTANTS;</div>
          </li>
          <li>
            URL, HTML 같은 범용적인 대문자 약어는 대문자 그대로 사용한다.{" "}
            <div className="code-wrap">parseHTML, parseXML</div>
          </li>
          <li>전역 변수를 사용하지 않는다.</li>
          <li>
            값이 변하지 않는 변수는 const를, 값이 변하는 변수는 let을 사용하여
            선언한다. var는 절대로 사용하지 않는다.
          </li>
          <li>const를 let 보다 위에 선언한다.</li>
          <li>const와 let은 사용 시점에 선언 및 할당을 한다.</li>
        </ul>
      <br/>
        <h2>1.1 Git Commit</h2>
        <span>커밋 메시지 + 이슈번호</span>
        <ul style={{border:'1px solid #bdbdbd', padding: '15px', borderRadius: '5px', margin: '15px 0 0 0'}}>
          <li>init: 초기 설정</li>
          <li>feat: 기능 추가, 변경</li>
          <li>modi : 코드 수정</li>
          <li>markup : 마크업</li>
          <li>remove : 파일이나 코드 삭제</li>
          <li>fix: 버그, 오류 수정</li>
          <li>
            style: CSS 등 사용자 UI 디자인 변경 (제품 코드 수정 발생, 코드
            형식, 정렬, 주석 등의 변경)
          </li>
          <li>refactor: 코드 리팩토링</li>
          <li>ci: npm 모듈 설치 등</li>
          <li>chore: 패키지 매니저 설정할 경우, etc 등</li>
          <li>etc: 기타 수정사항 발생 시</li>
          <li>src: 이미지, 아이콘 등 소스파일 추가 및 수정</li>

          <div style={{border:'1px solid #bdbdbd', padding: '15px', borderRadius: '5px', margin: '15px 0 0 0'}}>
          <h2>예시</h2>
          <div className="code-wrap">🔥 remove : 로그인페이지 파일 삭제</div>

        </div>
        </ul>

        <h2>1.2 Git Branch</h2>
        <div style={{border:'1px solid #bdbdbd', padding: '15px', borderRadius: '5px', margin: '10px 0 0 0'}}>
        <span>feature/기능/ 해당 개발자 이름</span>
        <h3 style={{padding:'10px 0'}}>ex : 유진이 버튼을 개발하는 브랜치 → feature/button/jin </h3>
        <span>Issue template</span>
        <div className="code-wrap">
          🧾 제목 설명을 작성해주세요
          <br /> ✅ TO-DO - [ ] 세부 할 일 1 - [ ] 세부 할 일 2<br /> 📎
          참고 ( ex. 만들 기능 스크린샷 )
        </div>
        <span>PR template</span>
        <div className="code-wrap">
          PR 유형 
          <br/>- [ ] 🎉 **Feat**: 새로운 기능 추가
          <br /> - [ ] 🧩 **MarkUp**: 마크업
          <br /> - [ ] 🎞 **Src**: 이미지, 아이콘 등 소스파일 추가 및 수정
          <br /> - [ ] 🐛 **Fix**: 버그, 오류 수정
          <br /> - [ ] 📝 **Docs**: README.md, JSON 파일 등 문서 수정,
          라이브러리 설치 (문서 관련, 코드 수정 없음)
          <br /> - [ ] 💄 **Style**: CSS 등 사용자 UI 디자인 변경 (코드 수정
          포함, 코드 형식, 정렬, 주석 등의 변경)
          <br /> - [ ] ♻️ **Refactor**: 코드 리팩토링 (기능 변화 없음) 
          <br /> - [ ] 🧪
          **Test**: 테스트 코드 추가, 삭제, 변경 (코드 수정 없음, 테스트 코드
          관련 모든 변경에 해당)
          <br /> - [ ] 🐎 **CI**: CI 관련 설정 (npm 모듈 설치 등)
          <br /> - [ ] 🐳 **Chore**: 빌드 시스템 또는 패키지 매니저 설정 수정
          <br />
          --- PR 체크리스트
          <br /> - [ ] 커밋 메시지 컨벤션에 맞게 작성했습니다. <br />- [ ] 변경
          사항에 대한 테스트를 완료했습니다. (버그 수정/기능 테스트).
          <br /> --- PR 상세 --- 이슈
          <br /> `resolves #이슈번호`
        </div>
        </div>
      </div>
        <br/>
    </div>
  );
}

export default FrontGuide;
