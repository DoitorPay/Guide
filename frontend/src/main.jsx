import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// tailwindCss 적용
import './assets/css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
    <div className="bg-blue-500"> Tailwind Css 적용 테스트... 안됨; </div>
  </React.StrictMode>
);