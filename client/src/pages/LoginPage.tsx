// src/components/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useAuth } from "../context/AuthContext.tsx";

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth()!;
  const server = import.meta.env.VITE_BACK_END_SERVER;
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/login`, {
        username,
        password,
      });
      console.log(response.data);
      auth.login(response.data.user);
    } catch (error) {
      console.error(error);
    }
  };
  if (auth.isAuthenticated()) {
    return <h1>Welcome, {auth.user?.display_name}</h1>;
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col mx-auto justify-center items-center gap-4"
    >
      <h1>Login</h1>
      <label htmlFor="username">Username:</label>
      <input
        type="text"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <label htmlFor="password">Password:</label>
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      <button type="submit" className="btn btn-primary">
        Login
      </button>
    </form>
  );
};

export default LoginPage;
