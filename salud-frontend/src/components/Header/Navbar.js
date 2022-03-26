import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

function Navbar() {
  const location = useLocation();
  const [value, setValue] = useState(location.pathname);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nickName, setNickName] = React.useState(null);
  const history = useHistory();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

useEffect(() => {
        let user = JSON.parse(sessionStorage.getItem('user'))
        setNickName(user.data.apellido)
    }, [])

const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };

const handleClose = () => {
        setAnchorEl(null);
    };

function logOut() {
        sessionStorage.clear();
        history.push('/login');
    }

  return (
    <>
      <div className="navbar">
        {!isMatch && (
          <Tabs
            value={value}
            TabIndicatorProps={{
              style: { background: "#00b64f" },
            }}
            onChange={handleChange}
          >
            {SidebarData.map((item, index) => {
              return (
                <CustomTab
                  icon={item.icon}
                  label={item.title}
                  key={index}
                  value={item.path}
                  to={item.path}
                  component={Link}
                />
              );
            })}
          </Tabs>
          
        )}

        <div className="logout">

          <button onClick={handleClick} class="btn waves-effect green darken-1" type="submit" name="action">{nickName}
            <i class="material-icons right">exit_to_app</i>
          </button>
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
    </>
  );
}

const CustomTab = styled((props) => <Tab disableRipple {...props} />)(() => ({
  textTransform: "none",
  marginLeft: "1px",
  marginRight: "1px",
  color: "white",
  "&.Mui-selected": {
    color: "#00b64f",
  },
}));

export default Navbar;
