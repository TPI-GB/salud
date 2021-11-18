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
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import { makeStyles } from "@mui/styles";
import { Modal } from "@mui/material";

const baseUrl = "http://localhost:8080/users";

const useStyles = makeStyles({
  modal: {
    background: "linear-gradient(45deg, #FE6B8B 30%, #FF8E53 90%)",
    border: 0,
    borderRadius: 3,
    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
    color: "white",
    height: 48,
    padding: "0 30px",
  },
  inputMaterial:{
    width: '100%'
  }
});

export default function PinnedSubheaderList() {
  //const [usuariosList, setUsuariosList] = useState([]);
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);

  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    nombre: "",
    apellido: "",
    contrasenia: "",
    email: "",
    roles: "",
    tipodocumento: "",
    numerodocumento: ""
  });

  const handleChange=e=>{
    const {name, value}=e.target;
    setUsuarioSeleccionado(prevState=>({
      ...prevState,
      [name]: value
    }))
    console.log(usuarioSeleccionado);
  }

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario)
    (caso==='Editar')?modalEditar(true): ''
  };

  useEffect(async () => {
    await peticionGet();
  }, []);

  const bodyEditar=(
    <div className={styles.modal}>
      <h3>Editar Consola</h3>
      <TextField name="nombre" className={styles.inputMaterial} label="Nombre" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.nombre}/>
      <br />
      <TextField name="apellido" className={styles.inputMaterial} label="Apellido" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.apellido}/>
      <br />
      <TextField name="contrasenia" className={styles.inputMaterial} label="Contraseña" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.contrasenia}/>
      <br />
      <TextField name="email" className={styles.inputMaterial} label="Email" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.email}/>
      <br />
      <TextField name="roles" className={styles.inputMaterial} label="Roles" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.roles}/>
      <br />
      <TextField name="tipodocumento" className={styles.inputMaterial} label="Tipo documento" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.tipodocumento}/>
      <br />
      <TextField name="numerodocumento" className={styles.inputMaterial} label="Numero documento" onChange={handleChange} value={usuarioSeleccionado && usuarioSeleccionado.numerodocumento}/>
      <br /><br />
      <div align="right">
        <Button color="primary" onClick={()=>peticionPut()}>Editar</Button>
        <Button onClick={()=>abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  )

  // useEffect(() => {
  //   obtenerDatos();
  // }, []);

  // const obtenerDatos = async () => {
  //   const response = await fetch(`http://localhost:8080/users`);
  //   const respuesta = await response.json();
  //   setUsuariosList(respuesta);
  // };

  // console.log(usuariosList);

  return (
    <div className="App">
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key={"nombreColumnas"}>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Tipo documento</TableCell>
              <TableCell>Numero documento</TableCell>
              <TableCell>Acciones</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((usuario) => (
              <TableRow key={usuario.id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.tipodocumento}</TableCell>
                <TableCell>{usuario.numerodocumento}</TableCell>
                <TableCell>
                  <ModeEditOutlineTwoToneIcon onClick={}/>
                  &nbsp;&nbsp;&nbsp;
                  <NotInterestedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
    </div>
  );
}
