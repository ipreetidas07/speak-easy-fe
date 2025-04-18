import { RouteObject } from "react-router-dom";
import Dashboard from "./Dashboard";
import AppLayout from "@layout/AppLayout";
import Products from "./Products";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "products", element: <Products /> },
    ],
  },
];

export default routes;
