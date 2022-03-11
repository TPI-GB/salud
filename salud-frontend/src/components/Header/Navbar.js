import React, { useState } from "react";
import "./Navbar.css";
import { Tabs, Tab, useTheme, useMediaQuery } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link, useLocation } from "react-router-dom";
import { SidebarData } from "./SidebarData";

//Iconos
import MenuIcon from "@mui/icons-material/Menu";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";

function Navbar() {
  const [sidebar, setSidebar] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);
  const location = useLocation();
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

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
        {isMatch && (
          <Link to="#" className="menu-bars">
            <MenuIcon onClick={showSidebar} />
          </Link>
        )}
      </div>
      <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
        <ul className="nav-menu-items" onClick={showSidebar}>
          <li className="navbar-toggle">
            <Link to="#" className="menu-bars">
              <CloseRoundedIcon />
            </Link>
          </li>
          {SidebarData.map((item, index) => {
            return (
              <li key={index} className={item.cName}>
                <Link to={item.path}>
                  {item.icon}
                  <span>{item.title}</span>
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>
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
