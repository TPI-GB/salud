import React, { useState, useEffect } from "react";
import './Navbar.css';
import { Link, useHistory } from "react-router-dom";
import { SidebarData } from './SidebarData';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

//Iconos
import MenuIcon from '@mui/icons-material/Menu';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';

function Navbar() {
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [nickName, setNickName] = React.useState(null);
    
    useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        setNickName(user.data.apellido)
    }, [])


    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

    const [sidebar, setSidebar] = useState(false);

    const showSidebar = () => setSidebar(!sidebar);

    const history = useHistory();

    

    function logOut() {
        sessionStorage.clear();
        history.push('/login');
    }

    return (
        <div>
            <div className="navbar" >
                <Link to="#" className='menu-bars'>
                    <MenuIcon onClick={showSidebar} />
                </Link>

               <div className="logout">
                    <Button
                        variant="contained"
                        color="success"
                        onClick={handleClick} >
                        {nickName}
                    </Button>
                    
                     {/* 
                    <a class="waves-effect green lighten-2 btn">
                        <i class="material-icons right">exit_to_app</i>{nickName}</a>
                            */}
                    <Menu
                        id="simple-menu"
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={handleClose}
                    >
                        <MenuItem onClick={logOut}>Cerrar sesión</MenuItem>
                    </Menu>
                </div> 
            </div>
            <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
                <ul className='nav-menu-items' onClick={showSidebar}>
                    <li className="navbar-toggle">
                        <Link to="#" className='menu-bars'>
                            <CloseRoundedIcon />
                        </Link>
                    </li>
                    {SidebarData.map((item, index) => {
                        return (
                            <li key={index} className={item.cName}>
                                <Link to={item.path}>
                                    {item.icon}
                                    <span>
                                        {item.title}
                                    </span>
                                </Link>
                            </li>
                        )
                    })}
                </ul>
            </nav>
        </div>

    )
}

export default Navbar;