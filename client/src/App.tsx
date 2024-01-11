import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import axios from "axios";

import "./App.css";
import NavBar from "./components/NavBar.tsx";
import { useAuth } from "./context/AuthContext.tsx";

function App() {
  useEffect(() => {
    themeChange(false);
    checkSession();
  }, []);
  const server = import.meta.env.VITE_BACK_END_SERVER;
  const auth = useAuth()!;
  axios.defaults.withCredentials = true;
  const checkSession = async () => {
    if (!auth.user) {
      try {
        const response = await axios.get(`${server}/check_session`);
        auth.login(response.data.user);
      } catch (error) {
        console.error(error);
      }
    }
  };
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bg-base-200 min-h-svh w-full">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-black text-neutral-content">
        <p>Copyright © 2023. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
