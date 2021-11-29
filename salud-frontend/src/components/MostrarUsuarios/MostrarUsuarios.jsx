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
import { makeStyles, propsToClassKey } from "@mui/styles";
//import { makeStyles } from "@material-ui/core/styles";
import { Checkbox, FormControlLabel, Modal, Switch } from "@mui/material";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import FormularioUsuario from "../FormularioUsuario/FormularioUsuario";
import { useForm } from "react-hook-form";

const baseUrl = "http://localhost:8080/users/";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "white",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
});

export default function PinnedSubheaderList() {
  const { register } = useForm();
  //const [usuariosList, setUsuariosList] = useState([]);
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    _id: "",
    nombre: "",
    apellido: "",
    email: "",
    roles: [],
    tipodocumento: "",
    numerodocumento: "",
    activo: "true",
  });
  const checkedAux = (rol, roles) => {
    return roles.includes(rol);
  };
  const [laboratorio, setLaboratorio] = useState(
    checkedAux("Laboratorio", usuarioSeleccionado.roles)
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    console.log(usuarioSeleccionado);
  };

  const peticionGet = async () => {
    await axios.get(baseUrl).then((response) => {
      setData(response.data);
    });
  };

  const peticionPut = async () => {
    await axios
      .put(baseUrl + usuarioSeleccionado._id, usuarioSeleccionado)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((usuario) => {
          if (usuarioSeleccionado._id === usuario._id) {
            usuario.nombre = usuarioSeleccionado.nombre;
            usuario.apellido = usuarioSeleccionado.apellido;
            usuario.email = usuarioSeleccionado.email;
            usuario.roles = usuarioSeleccionado.roles;
            usuario.tipodocumento = usuarioSeleccionado.tipodocumento;
            usuario.numerodocumento = usuarioSeleccionado.numerodocumento;
            usuario.activo = usuarioSeleccionado.activo;
          }
        });
        setData(dataNueva);
        abrirCerrarModalEditar();
      });
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    caso === "Editar" && setModalEditar(true);
  };

  useEffect(async () => {
    await peticionGet();
  }, []);

  useEffect(() => {}, [usuarioSeleccionado.roles]);

  function rolesAux(elRol, e) {
    if (e.target.checked) {
      setLaboratorio(true);
      if (!usuarioSeleccionado.roles.includes(elRol)) {
        usuarioSeleccionado.roles.push(elRol);
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      setLaboratorio(false);
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != elRol
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  const bodyEditar = (
    <div className={styles.modal}>
      <h3>Editar Usuario</h3>
      <TextField
        name="nombre"
        className={styles.inputMaterial}
        label="Nombre"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.nombre}
      />
      <br />
      <TextField
        name="apellido"
        className={styles.inputMaterial}
        label="Apellido"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.apellido}
      />
      <br />
      <br />
      <TextField
        name="email"
        className={styles.inputMaterial}
        label="Email"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.email}
      />
      <br />
      <br />
      <TextField
        name="activo"
        className={styles.inputMaterial}
        label="Estado"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.activo}
      />
      <br />

      <FormControlLabel
        control={<Checkbox />}
        defaultChecked={checkedAux("Laboratorio", usuarioSeleccionado.roles)}
        label="Laboratorio"
        value="Laboratorio"
        {...register("roles")}
        onChange={(e) => rolesAux("Laboratorio", e)}
        checked={checkedAux("Laboratorio", usuarioSeleccionado.roles)}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Recepcion"
        value="Recepcion"
        defaultChecked={checkedAux("Recepcion", usuarioSeleccionado.roles)}
        {...register("roles")}
        onChange={(e) => rolesAux("Recepcion", e)}
        checked={checkedAux("Recepcion", usuarioSeleccionado.roles)}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Secretaria"
        value="Secretaria"
        defaultChecked={checkedAux("Secretaria", usuarioSeleccionado.roles)}
        {...register("roles")}
        onChange={(e) => rolesAux("Secretaria", e)}
        checked={checkedAux("Secretaria", usuarioSeleccionado.roles)}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Director"
        value="Director"
        defaultChecked={checkedAux("Director", usuarioSeleccionado.roles)}
        {...register("roles")}
        onChange={(e) => rolesAux("Director", e)}
        checked={checkedAux("Director", usuarioSeleccionado.roles)}
      />
      <FormControlLabel
        control={<Checkbox />}
        label="Admin"
        value="Admin"
        defaultChecked={checkedAux("Admin", usuarioSeleccionado.roles)}
        {...register("roles")}
        onChange={(e) => rolesAux("Admin", e)}
        checked={checkedAux("Admin", usuarioSeleccionado.roles)}
      />
      <br />
      <TextField
        name="tipodocumento"
        className={styles.inputMaterial}
        label="Tipo documento"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.tipodocumento}
      />
      <br />
      <TextField
        name="numerodocumento"
        className={styles.inputMaterial}
        label="Numero documento"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.numerodocumento}
      />
      <br />
      <br />
      <div align="right">
        <Button color="primary" onClick={() => peticionPut()}>
          Editar
        </Button>
        <Button onClick={() => abrirCerrarModalEditar()}>Cancelar</Button>
      </div>
    </div>
  );

  return (
    <div className="App">
      <h1>Usuarios actuales</h1>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow key={"nombreColumnas"}>
              <TableCell>Nombre</TableCell>
              <TableCell>Apellido</TableCell>
              <TableCell>Tipo documento</TableCell>
              <TableCell>Numero documento</TableCell>
              <TableCell>Estado</TableCell>
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
                <TableCell>{usuario.activo}</TableCell>
                <TableCell>
                  <ModeEditOutlineTwoToneIcon
                    className={styles.iconos}
                    onClick={() => seleccionarUsuario(usuario, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <NotInterestedIcon />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        classname={styles.modal}
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {bodyEditar}
      </Modal>
    </div>
  );
}
