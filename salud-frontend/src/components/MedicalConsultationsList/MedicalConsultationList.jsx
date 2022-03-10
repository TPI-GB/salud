import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  ListItemText,
  Collapse,
  ListItemButton,
  Tooltip,
  Fab,
} from "@mui/material";
import { Link } from "react-router-dom";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import MasksIcon from "@mui/icons-material/Masks";
import AddIcon from "@mui/icons-material/Add";

export default function MedicalConsultationList(props) {
  const { consultas } = props;

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6">Consultas</Typography>
        <Tooltip title="Agregar consulta">
          <Fab
            size="small"
            sx={{ ml: "15px" }}
            component={Link}
            to={"/NuevaHistoriaClinica"}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Grid container>
        {consultas.map((consulta) => {
          return <ConsultationItemList consultaInfo={consulta} />;
        })}
      </Grid>
    </Box>
  );
}

function ConsultationItemList(props) {
  const { consultaInfo } = props;

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <Grid
      container
      item
      sx={{
        border: "solid 4px green",
        margin: "10px 0px",
      }}
    >
      <Grid
        item
        xs={12}
        sm={12}
        md={4}
        lg={4}
        xl={4}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
          backgroundColor: "#F2F3F4",
        }}
      >
        <Box>
          <MasksIcon fontSize="large" />
          <Typography>{consultaInfo.creacion}</Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={8} lg={8} xl={8}>
        <Box textAlign={"center"}>
          <Typography fontWeight={"bold"}>Doctor</Typography>
          <Typography backgroundColor={"#F2F3F4"}>
            {consultaInfo.doctor}
          </Typography>
          <Typography fontWeight={"bold"}>Motivo</Typography>
          <Typography backgroundColor={"#F2F3F4"}>
            {consultaInfo.motivo}
          </Typography>
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box>
          <ListItemButton onClick={handleClick}>
            <ListItemText primary="Descripción" />
            {open ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={open} timeout="auto" unmountOnExit>
            <Typography padding={"16px 16px"} backgroundColor={"#F2F3F4"}>
              {consultaInfo.textoLibre
                ? consultaInfo.textoLibre
                : "No se encontró información"}
            </Typography>
          </Collapse>
        </Box>
      </Grid>
    </Grid>
  );
}
