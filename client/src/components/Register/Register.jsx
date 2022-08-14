import React from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { register } from "../../utils/user";
import "./register.css";

export default function Register() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const navigate = useNavigate();

  const handleRegister = async () => {
    try {
      await register(username, password, email);
      setTimeout(() => navigate("/login"), 2000);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <h2>register</h2>
      <input
        type="text"
        name="username"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
        value={username}
      />
      <input
        type="text"
        name="email"
        placeholder="email"
        onChange={(e) => setEmail(e.target.value)}
        value={email}
      />
      <input
        type="password"
        name="password"
        placeholder="password"
        onChange={(e) => setPassword(e.target.value)}
        value={password}
      />
      <button onClick={() => handleRegister()}>register</button>
    </div>
  );
}
