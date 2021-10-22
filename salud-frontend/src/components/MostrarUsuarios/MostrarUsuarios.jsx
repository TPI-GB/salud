//import * as React from 'react';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import React, { useState, useEffect } from "react";

const aux = {
    nombre: "carlos",
    apellido: "fernandez",
    tipodocumento: "dni",
    numerodocumento: "40230528"
}

export default function PinnedSubheaderList() {

    const [usuariosList, setUsuariosList] = useState([]);

    useEffect(() => {
      obtenerDatos();
    }, []);
  
    const obtenerDatos = async () => {
      const response = await fetch(
        `http:localhost:8080/v1/users`
      );
      const usuarios = await response.json();
      setUsuariosList(usuarios);
    };  

    console.log(usuariosList);

  return (
    <List
      sx={{
        width: '100%',
        maxWidth: 360,
        bgcolor: 'background.paper',
        position: 'relative',
        overflow: 'auto',
        maxHeight: 300,
        '& ul': { padding: 0 },
      }}
      subheader={<li />}
    >
      {[0, 1].map((sectionId) => (
        <li key={`section-${sectionId}`}>
          <ul>
            <ListSubheader>{`Datos del usuario ${sectionId}`}</ListSubheader>
            {usuariosList.map((usuario) => (
              <ListItem key={`item-${sectionId}-${usuario}`}>
                <ListItemText primary={`Nombre ${usuario.nombre}`+`Apellido ${usuario.apellido}`+`TipoDocumento ${usuario.tipodocumento}`+`NumeroDocumento ${usuario.numerodocumento}`} />
              </ListItem>
            ))}
          </ul>
        </li>
      ))}
    </List>
  );
}