import { Outlet } from "react-router-dom";
import { useState, useEffect } from "react";
import { themeChange } from "theme-change";
import "./App.css";
import NavBar from "./components/NavBar.tsx";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <>
      <header>
        <NavBar />
      </header>
      <main className="bg-base-200 min-h-svh flex w-full">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-black text-neutral-content">
        <p>Copyright © 2023. All rights reserved.</p>
      </footer>
    </>
  );
}

export default App;
