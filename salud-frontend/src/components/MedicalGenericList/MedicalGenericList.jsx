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
  Button,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import { Link as ScrollLink, animateScroll as scroll } from "react-scroll";

import { localTZDate } from "../../services/medical-history-service";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";
import AddIcon from "@mui/icons-material/Add";

export default function MedicalGenericList(props) {
  const { data, icon, title, links, borderColor, idScroll } = props;
  const [actualData, setActualData] = useState(data.slice(0, 3));
  const [page, setPage] = useState(1);

  function pageCount() {
    if (data.length % 3 >= 1) {
      return Math.floor(data.length / 3) + 1;
    } else {
      return Math.floor(data.length / 3);
    }
  }

  function paginatedData(pageNumber, pageSize) {
    return data.slice((pageNumber - 1) * pageSize, pageNumber * pageSize);
  }

  function handleChange(event, value) {
    setActualData(paginatedData(value, 3));
    setPage(value);
  }

  return (
    <Box>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6" id={idScroll}>
          {title}
        </Typography>
        <Tooltip title="Crear nuevo/a">
          <Fab
            size="small"
            sx={{ ml: "15px" }}
            component={Link}
            to={links.create}
          >
            <AddIcon />
          </Fab>
        </Tooltip>
      </Box>
      <Grid container>
        {actualData.map((data) => {
          return (
            <DataItemList
              info={data}
              key={data._id}
              editLink={links.edit}
              icon={icon}
              borderColor={borderColor}
            />
          );
        })}
      </Grid>
      {data.length / 3 >= 1 && (
        <ScrollLink to={idScroll} smooth={true} duration={500}>
          <Pagination
            count={pageCount()}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        </ScrollLink>
      )}
    </Box>
  );
}

function DataItemList(props) {
  const { info, editLink, icon, borderColor } = props;
  const dateFormat = "DD/MM/YYYY hh:mm";
  const dates = {
    creacion: localTZDate(info.creacion, dateFormat),
    modificacion: localTZDate(info.ultimaModificacion, dateFormat),
  };

  const [openDescripcion, setOpenDescripcion] = useState(false);
  const [openArchivos, setOpenArchivos] = useState(false);

  const handleClickDescripcion = () => {
    setOpenDescripcion(!openDescripcion);
  };

  const handleClickArchivos = () => {
    setOpenArchivos(!openArchivos);
  };

  return (
    <Grid
      container
      item
      sx={{
        border: "solid 4px " + borderColor,
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
          {icon}
          <Typography>Creación: {dates.creacion}</Typography>
          <Typography>Modificación: {dates.modificacion}</Typography>
          <Button
            variant="contained"
            size="small"
            fullWidth
            component={Link}
            to={editLink}
          >
            Editar
          </Button>
        </Box>
      </Grid>
      <Grid
        item
        xs={12}
        sm={12}
        md={8}
        lg={8}
        xl={8}
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Box width={"100%"}>
          {info.nombre ? (
            <>
              <Typography fontWeight={"bold"}>Nombre</Typography>
              <Typography backgroundColor={"#F2F3F4"}>{info.nombre}</Typography>
            </>
          ) : (
            <>
              <Typography fontWeight={"bold"}>Doctor</Typography>
              <Typography backgroundColor={"#F2F3F4"}>{info.doctor}</Typography>
              <Typography fontWeight={"bold"}>Motivo</Typography>
              <Typography backgroundColor={"#F2F3F4"}>{info.motivo}</Typography>
            </>
          )}
        </Box>
      </Grid>
      <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
        <Box>
          <ListItemButton onClick={handleClickDescripcion}>
            <ListItemText primary="Descripción" />
            {openDescripcion ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openDescripcion} timeout="auto" unmountOnExit>
            <Typography padding={"16px 16px"} backgroundColor={"#F2F3F4"}>
              {info.textoLibre ? info.textoLibre : "No se encontró información"}
            </Typography>
          </Collapse>
          <ListItemButton onClick={handleClickArchivos}>
            <ListItemText primary="Archivos" />
            {openArchivos ? <ExpandLess /> : <ExpandMore />}
          </ListItemButton>
          <Collapse in={openArchivos} timeout="auto" unmountOnExit>
            <Typography padding={"16px 16px"} backgroundColor={"#F2F3F4"}>
              {info.archivos.lenght === 0
                ? info.archivos
                : "No se encontraron archivos"}
            </Typography>
          </Collapse>
        </Box>
      </Grid>
    </Grid>
  );
}
