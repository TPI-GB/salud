import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";
import FormularioDeUsuario from "../FormularioUsuario/FormularioUsuario";

export default function PinnedSubheaderList() {
  const [usuariosList, setUsuariosList] = useState([]);

  useEffect(() => {
    obtenerDatos();
  }, []);

  useEffect(() => {
    obtenerDatos();
  }, []);

  const obtenerDatos = async () => {
    const response = await fetch(`http://localhost:8080/users`);
    const respuesta = await response.json();
    setUsuariosList(respuesta);
  };

  console.log(usuariosList);

  return (
    <>
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
          <li key={usuario._id}>
            <ul>
              <ListItem key={usuario._id}>
                <ListItemText
                  primary={`Nombre: ${usuario.nombre} Apellido: ${usuario.apellido} TipoDocumento: ${usuario.tipodocumento} NumeroDocumento: ${usuario.numerodocumento}`}
                />
              </ListItem>
            </ul>
          </li>
        ))}
      </List>
    </>
  );
}
