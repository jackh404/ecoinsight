import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import EnergyAssessment from "./pages/EnergyAssessment.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import React from "react";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <Home />,
      },
      {
        path: "/login",
        element: <LoginPage />,
      },
      {
        path: "/signup",
        element: <SignupPage />,
      },
      {
        path: "/dashboard",
        element: (
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/energy-assessment",
        element: (
          <ProtectedRoute>
            <EnergyAssessment />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </React.StrictMode>
);
