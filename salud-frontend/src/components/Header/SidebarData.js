import React from "react";

//Iconos
import HomeIcon from '@mui/icons-material/Home';
import VisibilityIcon from '@mui/icons-material/Visibility';
import DashboardIcon from '@mui/icons-material/Dashboard';
import AddIcon from '@mui/icons-material/Add';
import SearchIcon from '@mui/icons-material/Search';
import AddCircleIcon from '@mui/icons-material/AddCircle';

export const SidebarData = [
    {
        title: 'Home',
        path: '/',
        icon: <HomeIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Nueva HC',
        path: 'nuevaHC',
        icon: <AddCircleIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Buscar HC',
        path: '/buscarHC',
        icon: <SearchIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Nuevo Usuario',
        path: '/formularioUsuario',
        icon: <AddIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Mostrar Usuarios',
        path: '/mostrarUsuarios',
        icon: <VisibilityIcon/>,
        cName: 'nav-text'
    },
    {
        title: 'Dashboard',
        path: 'dashboard',
        icon: <DashboardIcon/>,
        cName: 'nav-text'
    },
]
