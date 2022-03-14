import React from "react";
import { Box, CircularProgress } from "@mui/material";

export default function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "500px",
      }}
    >
      <CircularProgress size={"300px"} />
    </Box>
  );
}
