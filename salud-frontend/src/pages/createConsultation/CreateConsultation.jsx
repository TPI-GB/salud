import React, { useEffect, useState } from "react";
import { makeStyles } from "@mui/styles";
import { Paper, Box } from "@mui/material";
import HealingIcon from "@mui/icons-material/Healing";
import FormHeader from "../../components/FormHeader/FormHeader";

const useStyles = makeStyles(() => ({
  pageContent: {
    margin: "16px 40px 40px",
    padding: "24px",
  },
}));
export default function CreateConsultation() {
  const classes = useStyles();

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DFDFDF" }}>
      <FormHeader
        title="Consulta Medica"
        subTitle="Nombre + Apellido"
        // subTitle={state.subtitleText}
        icon={<HealingIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        *Medico *TEXTO *ARCHIVO
        {/* <ConsultationForm buttonText={state.buttonText} id={id} /> */}
      </Paper>
      <form
        method="POST"
        action="http://localhost:8080/upload-multiple-images"
        enctype="multipart/form-data"
      >
        <div>
          <label>Seleccionar archivos:</label>
          <input type="file" name="docs" multiple />
        </div>
        <div>
          <input
            type="submit"
            name="btn_upload_multiple_filess"
            value="SUBIR"
          />
        </div>
      </form>
    </Box>
  );
}
