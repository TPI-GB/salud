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
  const [value, setValue] = useState(location.pathname);
  const theme = useTheme();
  const isMatch = useMediaQuery(theme.breakpoints.down("sm"));

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

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
