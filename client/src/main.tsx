import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

import { AuthProvider } from "./context/AuthContext.tsx";
import ProtectedRoute from "./components/ProtectedRoute.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import SignupPage from "./pages/SignUp.tsx";
import Dashboard from "./pages/Dashboard.tsx";
import EnergyAssessment from "./pages/EnergyAssessment.tsx";
import AssessmentResults from "./pages/AssessmentResults.tsx";
import Projects from "./pages/Projects.tsx";
import ProjectPage from "./pages/ProjectPage.tsx";
import ProjectShowcase from "./pages/ProjectShowcase.tsx";

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
      {
        path: "/assessment-results",
        element: (
          <ProtectedRoute>
            <AssessmentResults />
          </ProtectedRoute>
        ),
      },
      {
        path: "/projects",
        element: (
          <ProtectedRoute>
            <Projects />
          </ProtectedRoute>
        ),
      },
      {
        path: "project/:id/",
        element: (
          <ProtectedRoute>
            <ProjectPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "showcase",
        element: (
          <ProtectedRoute>
            <ProjectShowcase />
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
