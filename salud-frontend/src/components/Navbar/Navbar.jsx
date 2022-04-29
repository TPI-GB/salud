import React from "react";
import { AppBar, Toolbar, IconButton, Typography } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import MenuIcon from "@material-ui/icons/Menu";
import { ReactComponent as LoginLogo } from "../../assets/img/login-logo.svg";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: "16px",
  },
  title: {
    flexGrow: 1,
  },
  imagen: {
    borderRadius: "50%",
  },
}))

export default function Navbar() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppBar postion="static">
        <Toolbar>
          <IconButton
            edge="start"
            className={classes.menuButton}
            color="inherit"
          >
            <MenuIcon/>

          </IconButton>
          <Typography variant="h6" className={classes.title}>
            ESTADISTICAS
          </Typography>
          <IconButton color="inherit">
            <LoginLogo className='logo' width='38px'/>
          </IconButton>
        </Toolbar>
      </AppBar>
    </div>
  );
}
