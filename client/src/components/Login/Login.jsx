import React from "react";
import { useEffect } from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login } from "../../utils/user";
import "./login.css";

export default function Login({ setToken, clearToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    clearToken();
  });

  const handleLogin = async () => {
    try {
      const { data } = await login(username, password);
      setToken(data.accessToken);
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="login">
      <h2>login</h2>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => handleLogin()}>login</button>
      <Link to="/register">create an account</Link>
    </div>
  );
}
