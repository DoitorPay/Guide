import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
// tailwindCss 적용
import './assets/css/index.css'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);