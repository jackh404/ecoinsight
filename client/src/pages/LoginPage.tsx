// src/components/Login.tsx
import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext.tsx";
import Loading from "../components/Loading.tsx";

const LoginPage = () => {
  const server: string = import.meta.env.VITE_BACK_END_SERVER;
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const auth = useAuth()!;
  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent) => {
    setIsLoading(true);
    e.preventDefault();
    try {
      const response = await axios.post(`${server}/login`, {
        username,
        password,
      });
      auth.login(response.data.user);
      navigate("/dashboard");
    } catch (error: any) {
      setIsLoading(false);
      console.error(error);
      alert(`${error.response.status}: ${error.response.data.message}`);
    }
  };
  if (auth.isAuthenticated()) {
    return <h1>Welcome, {auth.user?.display_name}</h1>;
  }
  if (isLoading) {
    return (
      <div className="py-20">
        <Loading message="Logging in" />
      </div>
    );
  }
  return (
    <div>
      <div className="flex flex-col mx-auto items-center gap-8 md:flex-row justify-evenly">
        <form
          onSubmit={handleSubmit}
          className="flex flex-col justify-center items-center gap-4"
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
        <h2>Or</h2>
        <button
          className="btn btn-primary btn-lg"
          onClick={() => navigate("/signup")}
        >
          Sign Up
        </button>
      </div>
    </div>
  );
};

export default LoginPage;
