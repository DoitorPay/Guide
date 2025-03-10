import React from "react";
import Router from "./Router";
import './assets/css/reset.css'

function App() {
  return (
    <div className="App">
      <Router />
      <div className="bg-blue-500"> Tailwind Css 적용 테스트... 안됨; </div>
    </div>
  );
}

export default App;