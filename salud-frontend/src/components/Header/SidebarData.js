import React from "react";

//Iconos
import HomeIcon from "@mui/icons-material/Home";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import AccountBoxIcon from "@mui/icons-material/AccountBox";

export const SidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <HomeIcon />,
    cName: "nav-text",
  },
  {
    title: "Mostrar Usuarios",
    path: "/MostrarUsuarios",
    icon: <VisibilityIcon />,
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
  {
    title: "Nuevo Usuario",
    path: "/FormularioDeUsuario",
    icon: <AddIcon />,
    cName: "nav-text",
  },
  {
    title: "Usuarios",
    path: "/UserForm",
    icon: <AccountBoxIcon />,
    cName: "nav-text",
  },
];
