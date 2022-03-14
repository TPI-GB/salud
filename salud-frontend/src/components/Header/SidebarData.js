import React from "react";

//Iconos
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import DashboardIcon from "@mui/icons-material/Dashboard";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";

export const SidebarData = [
  {
    title: "Home",
    path: "/Home",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Usuarios",
    path: "/Usuarios",
    icon: <PeopleIcon />,
    cName: "nav-text",
  },
  {
    title: "Historias Clínicas",
    path: "/HistoriasClinicas",
    icon: <LocalHospitalIcon />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/Estadisticas",
    icon: <DashboardIcon />,
    cName: "nav-text",
  },
];
