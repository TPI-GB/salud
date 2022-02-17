import React from "react";
import { Card, Typography, CardContent } from "@material-ui/core";
import { makeStyles } from "@material-ui/core";

export default function CardHeader(props) {
  const useStyles = makeStyles(() => ({
    root: {
      flexGrow: 1,
      textAlign: "center",
      background: props.color,
    },
    texto: {
      fontsize: 18,
      color: props.font,
    },
    titulo: {
      fontWeight: "bold",
      fontsize: 22,
      color: props.font,
    },
  }));

  const classes = useStyles();
  return (
    <Card>
      <CardContent>
        {props.icono}
        <Typography className={classes.titulo}>{props.titulo}</Typography>
        <Typography className={classes.texto}>{props.texto}</Typography>
      </CardContent>
    </Card>
  );
}
