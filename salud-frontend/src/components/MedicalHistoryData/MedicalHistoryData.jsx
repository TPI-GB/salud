import React from "react";
import { Box, Grid, Typography, Paper } from "@mui/material";
import { localTZDate } from "../../services/medical-history-service";

export default function MedicalHistoryData(props) {
  const { data } = props;
  const dateFormat = "DD/MM/YYYY hh:mm";

  return (
    <Box>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataView
            field="Número de historia clínica"
            info={data.numeroHistoriaClinica}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataView
            field="Nombre y apellido"
            info={data.nombre + " " + data.apellido}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="País de nacimiento" info={data.paisDeNacimiento} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field={data.tipoDocumento} info={data.numeroDocumento} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Sexo" info={data.sexo} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Ocupación" info={data.ocupacionActual} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Edad" info={data.edad + " años"} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView field="Estado civil" info={data.estadoCivil} />
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
          <DataView field="Domicilio" info={data.domicilioActual} />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView
            field="Creación"
            info={localTZDate(data.ultimaModificacion, dateFormat)}
          />
        </Grid>
        <Grid item xs={12} sm={12} md={6} lg={6} xl={6}>
          <DataView
            field="Ultima modificación"
            info={localTZDate(data.ultimaModificacion, dateFormat)}
          />
        </Grid>
      </Grid>
    </Box>
  );
}

function DataView(props) {
  const { field, info } = props;

  return (
    <Box sx={{ textAlign: "center" }}>
      <Typography fontWeight={"bold"}>{field}</Typography>
      <Paper sx={{ backgroundColor: "#F2F3F4" }}>
        <Typography>{info ? info : "No se encotró información"}</Typography>
      </Paper>
    </Box>
  );
}
