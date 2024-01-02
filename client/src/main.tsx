import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import Home from "./pages/Home.tsx";
import ErrorPage from "./pages/ErrorPage.tsx";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

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
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
