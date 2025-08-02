import React, { useEffect } from "react";
import Router from "@/Router";
import useAuthStore from "@/stores/useAuthStore";

function App() {
  const isAuthLoading = useAuthStore((state) => state.isAuthLoading);

  useEffect(() => {
    useAuthStore.getState().checkLoginStatus();
  }, []);

  if (isAuthLoading) {
    return null;
  }

  return (
    <div className="App">
      <Router />
    </div>
  );
}

export default App;