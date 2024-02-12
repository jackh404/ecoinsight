import axios from "axios";

import { useAuth } from "../context/AuthContext.tsx";
import { useState } from "react";
import { FormData } from "../../types.ts";
const AccountEditForm = ({ close }: { close: () => void }) => {
  const server: string = import.meta.env.VITE_BACK_END_SERVER;
  const auth = useAuth()!;
  const [formData, setFormData] = useState<FormData>({
    username: auth.user?.username || "",
    email: auth.user?.email || "",
    password: "",
    first_name: auth.user?.first_name || "",
    last_name: auth.user?.last_name || "",
    display_name: auth.user?.display_name || "",
  });
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    for (let f in formData) {
      if (formData[f] === "") {
        delete formData[f];
      }
    }
    try {
      console.log("Submitting form data:", formData);
      const response = await axios.patch(
        `${server}/users/${auth.user?.id}`,
        formData
      );
      auth.login(response.data.user);
      close();
    } catch (error: any) {
      console.error(error);
      errorElement = error["message"];
    }
  };
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };
  let errorElement = "";
  return (
    <div>
      <form
        className="flex flex-col mx-auto justify-center items-center gap-4"
        onSubmit={handleSubmit}
      >
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          name="username"
          placeholder="Type to change..."
          value={formData.username}
          onChange={handleChange}
        />
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Type to change..."
          value={formData.email}
          onChange={handleChange}
        />
        <label htmlFor="first_name">First Name:</label>
        <input
          type="text"
          id="first_name"
          name="first_name"
          placeholder="Type to change..."
          value={formData.first_name}
          onChange={handleChange}
        />
        <label htmlFor="last_name">Last Name:</label>
        <input
          type="text"
          id="last_name"
          name="last_name"
          placeholder="Type to change..."
          value={formData.last_name}
          onChange={handleChange}
        />
        <label htmlFor="display_name">Display Name:</label>
        <input
          type="text"
          id="display_name"
          name="display_name"
          placeholder="Type to change..."
          value={formData.display_name}
          onChange={handleChange}
        />
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          value={formData.password}
          placeholder="Type to change..."
          onChange={e => setFormData({ ...formData, password: e.target.value })}
        />
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
        <p>{errorElement}</p>
      </form>
    </div>
  );
};

export default AccountEditForm;
