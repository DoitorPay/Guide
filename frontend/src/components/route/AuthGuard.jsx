import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

const AuthGuard = ({ children }) => {
  const { isLoggedIn, isAuthLoading, checkLoginStatus } = useAuthStore();
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (!hasChecked.current) {
      checkLoginStatus();
      hasChecked.current = true;
    }
  }, [checkLoginStatus]);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      alert("로그인이 필요합니다.");
      navigate("/landing");
    }
  }, [isLoggedIn, isAuthLoading, navigate]);

  if (isAuthLoading) return null;

  return isLoggedIn ? children : null;
};

export default AuthGuard;