import { Navigate, useRoutes } from "react-router-dom";
import Layout from "../layout";
import HomePage from "../pages/HomePage";
import Leaderboard from "../pages/Leaderboard";

export default function Router() {
  return useRoutes([
    {
      path: "/",
      element: <Layout />,
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
  ]);
}
