import axios from "axios";
import React, { useState } from "react";
import { useNavigate } from "react-router";

import { useAuth } from "../context/AuthContext.tsx";

type SignupFormData = {
  username: string;
  email: string;
  password: string;
  first_name: string;
  last_name: string;
  display_name: string;
};

const SignupPage: React.FC = () => {
  const navigate = useNavigate();
  const auth = useAuth()!;
  const [formData, setFormData] = useState<SignupFormData>({
    username: "",
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    display_name: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      console.log("Submitting form data:", formData);
      const response = await axios.post(`api/users`, formData);
      await auth.login(response.data.user);
      navigate("/dashboard");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className="flex flex-col mx-auto items-center gap-8 md:flex-row justify-evenly">
      <form onSubmit={handleSubmit} className="flex flex-col gap-4">
        <h1>Sign Up</h1>
        <div className="flex items-center justify-between">
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="first_name">First Name:</label>
          <input
            type="text"
            id="first_name"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="last_name">Last Name:</label>
          <input
            type="text"
            id="last_name"
            name="last_name"
            value={formData.last_name}
            onChange={handleChange}
          />
        </div>
        <div className="flex items-center justify-between">
          <label htmlFor="display_name">Display Name:</label>
          <input
            type="text"
            id="display_name"
            name="display_name"
            value={formData.display_name}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit" className="btn btn-primary">
          Signup
        </button>
      </form>
      <h2>Or</h2>
      <button
        type="button"
        className="btn btn-primary btn-lg"
        onClick={() => navigate("/login")}
      >
        Login
      </button>
    </div>
  );
};

export default SignupPage;
