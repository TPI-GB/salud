import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import React, { useState, useEffect } from "react";
import "./MostrarUsuarios.scss";
import Table from "@mui/material/Table";
import TableContainer from "@mui/material/TableContainer";
import Paper from "@mui/material/Paper";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import axios from "axios";

const baseUrl = "http://localhost:8080/users";

export default function PinnedSubheaderList() {
  const [usuariosList, setUsuariosList] = useState([]);

  const [data, setData] = useState([]);

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      // console.log("este console nuevo");
      // console.log(response.data);
      setData(response.data);
    });
  };

  useEffect(async () => {
    await peticionGet();
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

  // function createData(name, calories, fat, carbs) {
  //   return { name, calories, fat, carbs };
  // }

  // const rows = [
  //   createData("Tomas", "trinchero", "DNI", "40230528"),
  //   createData("Tomasito", "123trinchero", "DNI", "0528"),
  // ];

  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Nombre</TableCell>
            <TableCell align="right">Apellido</TableCell>
            <TableCell align="right">Tipo documento</TableCell>
            <TableCell align="right">Numero documento</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {/* {rows.map((row) => (
            <TableRow
              key={row.name}
              sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
            >
              <TableCell component="th" scope="row">
                {row.name}
              </TableCell>
              <TableCell align="right">{row.calories}</TableCell>
              <TableCell align="right">{row.fat}</TableCell>
              <TableCell align="right">{row.carbs}</TableCell>
            </TableRow>
          ))} */}
          {data.map}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
