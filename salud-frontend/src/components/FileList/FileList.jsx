import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Button,
  Typography,
} from "@mui/material";

export default function FileList({ files, ...props }) {
  return (
    <>
      {files.map((file) => (
        <FileCard file={file} key={file} sx={{ margin: "5px" }} />
      ))}
    </>
  );
}

function FileCard({ file, ...props }) {
  const fileName = file.split("/").pop();

  return (
    <Card {...props}>
      <CardContent>
        <Typography>{fileName}</Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Descargar</Button>
      </CardActions>
    </Card>
  );
}
