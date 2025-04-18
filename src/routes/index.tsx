import { RouteObject } from "react-router-dom";
import Dashboard from "./Dashboard";
import Tilicho from "./Tilicho";
import EduTech from "./EduTech";
import AppLayout from "@layout/AppLayout";
import HotelBooking from "./HotelBooking";

const routes: RouteObject[] = [
  {
    path: "/",
    element: <AppLayout />,
    children: [
      { path: "", element: <Dashboard /> },
      { path: "tilicho", element: <Tilicho /> },
      { path: "edu-tech", element: <EduTech /> },
      { path: "hotel-booking", element: <HotelBooking /> },
    ],
  },
];

export default routes;
