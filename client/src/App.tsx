import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { themeChange } from "theme-change";
import "./App.css";
import NavBar from "./components/NavBar.tsx";
import { AuthProvider } from "./context/AuthContext.tsx";

function App() {
  useEffect(() => {
    themeChange(false);
  }, []);
  return (
    <AuthProvider>
      <header>
        <NavBar />
      </header>
      <main className="bg-base-200 min-h-svh flex w-full">
        <Outlet />
      </main>
      <footer className="footer footer-center p-4 bg-black text-neutral-content">
        <p>Copyright © 2023. All rights reserved.</p>
      </footer>
    </AuthProvider>
  );
}

export default App;
