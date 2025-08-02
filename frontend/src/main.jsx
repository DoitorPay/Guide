import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App';
import '@/assets/css/index.css'
import useAuthStore from './stores/useAuthStore';

const initializeApp = async () => {
  try {
    await useAuthStore.getState().checkLoginStatus();
  } catch (error) {
    console.error("앱 초기화 중 로그인 체크 실패:", error);
  } finally {
    const root = ReactDOM.createRoot(document.getElementById('root'));
    root.render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    );
  }
};

initializeApp();