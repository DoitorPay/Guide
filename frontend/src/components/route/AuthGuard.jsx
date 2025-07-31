import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import useProfileStore from "@/stores/useProfileStore";

const AuthGuard = ({ children }) => {
  const { isLoggedIn } = useProfileStore();
  const navigate = useNavigate();
  const hasChecked = useRef(false);

  useEffect(() => {
    if (!isLoggedIn && !hasChecked.current) {
      hasChecked.current = true;
      alert("로그인을 해주세요.");
      navigate("/landing");
    }
  }, [isLoggedIn, navigate]);

  return isLoggedIn ? children : null;
};

export default AuthGuard;
