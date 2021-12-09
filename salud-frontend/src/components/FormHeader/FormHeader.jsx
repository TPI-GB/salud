import React from "react";
import { Paper, Card, Typography } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles(() => ({
  pageHeader: {
    paddingTop: "16px",
    paddingBottom: "16px",
    paddingLeft: "16px",
    display: "flex",
  },
  pageIcon: {
    display: "inline-block",
    padding: "16px",
  },
  pageTitle: {
    paddingLeft: "32px",
    "& .MuiTypography-subtitle2": {
      opacity: "0.6",
    },
  },
}));

export default function FormHeader(props) {
  const classes = useStyles();
  const { title, subTitle, icon } = props;

  return (
    <Paper elevation={0} square>
      <div className={classes.pageHeader}>
        <Card className={classes.pageIcon}>{icon}</Card>
        <div className={classes.pageTitle}>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <Typography variant="subtitle2" component="div">
            {subTitle}
          </Typography>
        </div>
      </div>
    </Paper>
  );
}
