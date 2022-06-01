import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MedicalTestForm from "../../components/MedicalTestForm";
import { useParams } from "react-router";
import BiotechIcon from "@mui/icons-material/Biotech";
import FormHeader from "../../components/FormHeader/FormHeader";

const useStyles = makeStyles(() => ({
  pageContent: {
    margin: "16px 40px 40px",
    padding: "24px",
  },
}));

export default function CreateMT() {
  const classes = useStyles();
  const [state, setState] = useState({ buttonText: "", subtitleText: "" });
  const { idHistoria, idEstudio } = useParams();

  useEffect(() => {
    if (idHistoria && idEstudio) {
      setState({ buttonText: "Editar", subtitleText: "Edición" });
    } else {
      setState({ buttonText: "Crear", subtitleText: "Digitalización" });
    }
  }, [idHistoria, idEstudio]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DFDFDF" }}>
      <FormHeader
        title="Estudios"
        subTitle={state.subtitleText}
        icon={<BiotechIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <MedicalTestForm
          buttonText={state.buttonText}
          idHistoria={idHistoria}
          idEstudio={idEstudio}
        />
      </Paper>
    </Box>
  );
}
