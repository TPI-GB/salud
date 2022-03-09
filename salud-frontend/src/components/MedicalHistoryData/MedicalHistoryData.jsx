import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";

export default function MedicalHistoryData(props) {
  const { data } = props;

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataView
            field="Número de historia clínica: "
            info={data.numeroHistoriaClinica}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataView
            field="Nombre y apellido: "
            info={data.nombre + " " + data.apellido}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="País de nacimiento: " info={data.paisDeNacimiento} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView
            field={data.tipoDocumento + ": "}
            info={data.numeroDocumento}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Sexo: " info={data.sexo} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Ocupación: " info={data.ocupacionActual} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Edad: " info={data.edad + " años"} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Estado civil: " info={data.estadoCivil} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataView field="Domicilio: " info={data.domicilioActual} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Creación: " info={data.creacion} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView
            field="Ultima modificación: "
            info={data.ultimaModificacion}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function DataView(props) {
  const { field, info } = props;

  return (
    <Paper sx={{ textAlign: "center" }}>
      <Typography>
        {field}
        {info ? info : "No se encotró información"}
      </Typography>
    </Paper>
  );
}
