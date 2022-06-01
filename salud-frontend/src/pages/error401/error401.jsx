import React from "react";
import "./error401.scss";
import { Box, Typography } from "@mui/material";

function error401() {
  return (
    <Box className="error401">
      <Box style={{ color: "white", opacity: 0.9 }}>
        <Typography
          variant="h1"
          component="div"
          style={{ padding: "10px 20px", textAlign: "center", color: "white" }}
        >
          ¡Su usuario no tiene acceso a esta parte de SALUDGB!
        </Typography>
        <Typography
          variant="h3"
          component="div"
          style={{ padding: "10px 20px", textAlign: "center", color: "white" }}
        >
          Por favor contacte al administrador.
        </Typography>
      </Box>
    </Box>
  );
}

export default error401;
