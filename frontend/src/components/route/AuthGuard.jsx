import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuthStore from '@/stores/useAuthStore';

const AuthGuard = ({ children }) => {
  const { isLoggedIn, isAuthLoading, user } = useAuthStore();
  const navigate = useNavigate();

  console.log('[AuthGuard] isLoggedIn:', isLoggedIn);
  console.log('[AuthGuard] isAuthLoading:', isAuthLoading);
  console.log('[AuthGuard] user:', user);

  useEffect(() => {
    if (!isAuthLoading && !isLoggedIn) {
      alert('로그인이 필요합니다.');
      navigate('/landing');
    }
  }, [isLoggedIn, isAuthLoading, navigate]);

  if (isAuthLoading) return null;

  return children;
};

export default AuthGuard;
