import React from "react";

//Iconos
import HomeIcon from "@mui/icons-material/Home";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DashboardIcon from "@mui/icons-material/Dashboard";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleIcon from "@mui/icons-material/AddCircle";

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
    title: "Buscar HC",
    path: "/BuscarPaciente",
    icon: <SearchIcon />,
    cName: "nav-text",
  },
  {
    title: "Nueva HC",
    path: "/NuevaHistoriaClinica",
    icon: <AddCircleIcon />,
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
];
