import React from "react";
import "./home.scss";
import { Box, Typography } from "@mui/material";

function Home() {
  return (
    <Box className="home">
      <Typography variant="h3" component="div">
        ¡Bienvenido a SaludGB!
      </Typography>
    </Box>
  );
}

export default Home;
