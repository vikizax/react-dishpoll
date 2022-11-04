import { useContext } from "react";
import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layout";
import HomePage from "../pages/HomePage";
import Leaderboard from "../pages/Leaderboard";
import LoginPage from "../pages/Login";
import { AuthContext } from "../context";
import { LinearProgress } from "@mui/material";

export default function Router() {
  const {
    auth: { authenticated, authenticating },
  } = useContext(AuthContext);

  return useRoutes([
    {
      path: "/",
      element: authenticating ? (
        <LinearProgress />
      ) : authenticated ? (
        <Layout />
      ) : (
        <Navigate to="/login" replace />
      ),
      children: [
        {
          path: "/",
          element: <HomePage />,
        },
        {
          path: "/leaderboard",
          element: <Leaderboard />,
        },
      ],
    },
    {
      path: "/login",
      element: <LoginPage />,
    },
  ]);
}
