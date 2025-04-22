import { RouteObject } from "react-router-dom";
import Dashboard from "./Dashboard";
import AppLayout from "@layout/AppLayout";
import Products from "./Products";
import Topics from "./Topics";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "products", element: <Products /> },
      { path: "topics", element: <Topics /> },
    ],
  },
];

export default routes;
