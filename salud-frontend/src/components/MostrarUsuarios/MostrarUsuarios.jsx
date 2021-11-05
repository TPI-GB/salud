//import * as React from 'react';
import { Button } from "@mui/material";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListSubheader from "@mui/material/ListSubheader";
import React, { useState, useEffect } from "react";

export default function PinnedSubheaderList() {
  const [usuariosList, setUsuariosList] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const response = await fetch(`http://localhost:8080/users`);
    const respuesta = await response.json();
    setUsuariosList(respuesta.usuarios);
  };

  console.log(usuariosList);

  return (
    <List
      sx={{
        width: "100%",
        maxWidth: 360,
        bgcolor: "background.paper",
        position: "relative",
        overflow: "auto",
        maxHeight: 300,
        "& ul": { padding: 0 },
      }}
      subheader={<li />}
    >
      {usuariosList.map((usuario) => (
        <li key={`section-${usuario}`}>
          <ul>
            <ListItem key={`item-${usuario}-${usuario}`}>
              <ListItemText
                primary={
                  `Nombre: ${usuario.nombre}` +
                  ` ` +
                  `Apellido: ${usuario.apellido}` +
                  ` ` +
                  `TipoDocumento: ${usuario.tipodocumento}` +
                  ` ` +
                  `NumeroDocumento: ${usuario.numerodocumento}`
                }
              />
            </ListItem>
          </ul>
        </li>
      ))}
    </List>
  );
}
