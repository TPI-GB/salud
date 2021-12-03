import React from "react";
import { Paper } from "@mui/material";
import { makeStyles } from "@mui/styles";
import MedicalHistoryForm from "../../components/MedicalHistoryForm";

const useStyles = makeStyles(() => ({
  pageContent: {
    margin: "40px",
    padding: "24px",
  },
}));

export default function CreateMH() {
  const classes = useStyles();

  return (
    <Paper className={classes.pageContent}>
      <MedicalHistoryForm />
    </Paper>
  );
}
