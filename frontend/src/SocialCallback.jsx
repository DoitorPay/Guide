import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SocialCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get('id');
    const sns = params.get('sns');
    const registered = params.get('registered') === 'true';

    if (id && sns) {
      localStorage.setItem('id', id);
      localStorage.setItem('sns', sns);

      if (registered) {
        navigate('/');
      } else {
        navigate('/signup');
      }
    } 
  }, [navigate]);

  return <p>로그인 처리 중입니다...</p>;
};

export default SocialCallback;
