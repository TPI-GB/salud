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
  return (
    <Card {...props}>
      <CardContent>
        <Typography>{file}</Typography>
      </CardContent>
      <CardActions>
        <a
          href={"http://localhost:8080/images/" + file}
          download
          target="_blank"
          rel="noreferrer"
        >
          <Button size="small">Descargar</Button>
        </a>
      </CardActions>
    </Card>
  );
}
