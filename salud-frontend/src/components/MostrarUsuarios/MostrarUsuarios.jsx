import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";
import "./MostrarUsuarios.scss";
import Card from "@mui/material/Card";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import Pagination from "@mui/material/Pagination";
import Stack from "@mui/material/Stack";
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

  function createData(name, calories, fat, carbs, protein) {
    return { name, calories, fat, carbs, protein };
  }

  const rows = [
    createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
    createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
    createData("Eclair", 262, 16.0, 24, 6.0),
    createData("Cupcake", 305, 3.7, 67, 4.3),
    createData("Gingerbread", 356, 16.0, 49, 3.9),
  ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <h1 className="Prueba">Usuarios actuales</h1>
        <List className="Prueba">
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
      </Table>
    </TableContainer>
  );
}
