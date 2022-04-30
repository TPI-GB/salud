import React, { useState, useEffect } from "react";
import "./Navbar.css";
import { Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation, useHistory } from "react-router-dom";
import { SidebarData } from "./SidebarData";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import Button from "@mui/material/Button";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";

function Navbar() {
  const location = useLocation();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [nickName, setNickName] = React.useState(null);
  const history = useHistory();

  const indexToTabName = [
    ["/Home", 0],
    ["/Usuarios", 1],
    ["/HistoriasClinicas", 2],
    ["/Estadisticas", 3],
  ];

  function initialSelectedTab() {
    const initialTab = indexToTabName.find((tuple) =>
      location.pathname.includes(tuple[0])
    );
    if (!initialTab) {
      return 0;
    }
    return initialTab[1];
  }

  const selectedTab = initialSelectedTab();

  useEffect(() => {
    let user = JSON.parse(sessionStorage.getItem("user"));
    if (user === null) {
      return "Avatar";
    }
    return setNickName(user.data.apellido);
  }, []);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  function logOut() {
    sessionStorage.clear();
    history.push("/login");
  }

  return (
    <>
      <div className="navbar">
        {!isMatch && (
          <Tabs
            value={selectedTab}
            TabIndicatorProps={{
              style: { background: "#00b64f" },
            }}
          >
            {SidebarData.map((item, index) => {
              return (
                <CustomTab
                  icon={item.icon}
                  label={item.title}
                  key={index}
                  value={index}
                  to={item.path}
                  component={Link}
                />
              );
            })}
          </Tabs>
        )}

        <div className="logout">
          <Button
            id="demo-customized-button"
            variant="contained"
            onClick={handleClick}
            endIcon={<ExitToAppIcon />}
          >
            {nickName}
          </Button>
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
