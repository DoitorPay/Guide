import { useState } from "react";
import axios from "axios";

const Login = () => {
  const [id, setId] = useState("");
  const [pw, setPw] = useState("");

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://localhost:8000/login", {
        username: id,
        password: pw,
      });
      console.log("로그인 성공:", res.data);
    } catch (err) {
      console.error("로그인 실패:", err.response?.data || err.message);
    }
  };

  return (
    <div className="w-full h-screen flex flex-col items-center justify-center gap-4">
      <input
        type="text"
        placeholder="ID"
        value={id}
        onChange={(e) => setId(e.target.value)}
        className="border p-2 rounded"
      />
      <input
        type="password"
        placeholder="Password"
        value={pw}
        onChange={(e) => setPw(e.target.value)}
        className="border p-2 rounded"
      />
      <button
        onClick={handleLogin}
        className="bg-blue-500 text-white px-4 py-2 rounded"
      >
        로그인
      </button>
    </div>
  );
};

export default Login;
