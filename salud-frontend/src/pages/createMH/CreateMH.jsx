import React, { useEffect, useState } from "react";
import { Paper, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MedicalHistoryForm from "../../components/MedicalHistoryForm";
import { useParams } from "react-router";
import LocalHospitalIcon from "@mui/icons-material/LocalHospital";
import FormHeader from "../../components/FormHeader/FormHeader";

const useStyles = makeStyles(() => ({
  pageContent: {
    margin: "16px 40px 40px",
    padding: "24px",
  },
}));

export default function CreateMH() {
  const classes = useStyles();
  const [state, setState] = useState({ buttonText: "", subtitleText: "" });
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      setState({ buttonText: "Editar", subtitleText: "Edición" });
    } else {
      setState({ buttonText: "Crear", subtitleText: "Digitalización" });
    }
  }, [id]);

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DFDFDF" }}>
      <FormHeader
        title="Historia clínica"
        subTitle={state.subtitleText}
        icon={<LocalHospitalIcon fontSize="large" />}
      />
      <Paper className={classes.pageContent}>
        <MedicalHistoryForm buttonText={state.buttonText} id={id} />
      </Paper>
    </Box>
  );
}
