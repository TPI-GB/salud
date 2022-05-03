import { updateUser, getUsers, getUserById } from "../../services/user-service";
import React, { useState, useEffect } from "react";
import "./MostrarUsuarios.scss";
import {
  Table,
  TableContainer,
  Paper,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Checkbox,
  FormControlLabel,
  Modal,
  Button,
  Alert,
  Collapse,
  Select,
  MenuItem,
  FormControl,
  Fab,
  Box,
  Stack,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import UserForm from "../UserForm/UserForm";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { useHistory } from "react-router-dom";
import Grid from "@mui/material/Grid";

const baseUrl = "http://localhost:8080/users/";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 880,
    color: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
    backgroundColor: "white",
    padding: "4em",
  },
  iconos: {
    cursor: "pointer",
  },
  inputMaterial: {
    width: "100%",
  },
});

export default function PinnedSubheaderList() {
  const history = useHistory();

  const { register } = useForm();
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [mostrarConfirmacionAlEditar, setMostrarConfirmacionAlEditar] =
    useState(false);
  const [usuarioSeleccionado, setUsuarioSeleccionado] = useState({
    _id: "",
    nombre: "",
    apellido: "",
    email: "",
    roles: [],
    tipodocumento: "",
    numerodocumento: "",
    activo: "",
  });

  const checkedAux = (rol, roles) => {
    return roles.includes(rol);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUsuarioSeleccionado((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const peticionPut = async (usuarioActualizado) => {
    await axios
      .put(baseUrl + usuarioActualizado._id, usuarioActualizado)
      .then((response) => {
        var dataNueva = data;
        dataNueva.forEach((usuario) => {
          if (usuarioActualizado._id === usuario._id) {
            usuario.nombre = usuarioActualizado.nombre;
            usuario.apellido = usuarioActualizado.apellido;
            usuario.email = usuarioActualizado.email;
            usuario.roles = usuarioActualizado.roles;
            usuario.tipodocumento = usuarioActualizado.tipodocumento;
            usuario.numerodocumento = usuarioActualizado.numerodocumento; //hacer if por aca
            usuario.activo = usuarioActualizado.activo.toString();
          }
        });
        setData(dataNueva);
        setMostrarConfirmacionAlEditar(true);
      });
  };

  async function getData() {
    const response = await getUsers();
    setData(response.data);
  }

  const cambiarHabilitacion = async (usuario) => {
    await updateUser(usuario._id, { activo: !usuario.activo });
    getData();
  };

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {}, [usuarioSeleccionado.roles]);

  function manejarCerrar() {
    setModalEditar(!modalEditar);
    setMostrarConfirmacionAlEditar(false);
  }

  return (
    //<div className="App">
    <Box component="form">
      <Grid container>
        <div className="botonNuevoUsuario">
          <Button
            variant="contained"
            style={{ background: "#008f4c" }}
            href="/NuevoUsuario"
          >
            <AddIcon /> Nuevo usuario
          </Button>
        </div>
        <div class="container">
          <div class="right">
            <input type="search" placeHolder="Search Text..."></input>
          </div>
          <div class="center">Menu</div>
        </div>
        <div className="tituloTabla">
          <h1 align="center">Usuarios actuales</h1>
        </div>

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
                <TableRow key={usuario._id}>
                  <TableCell>{usuario.nombre}</TableCell>
                  <TableCell>{usuario.apellido}</TableCell>
                  <TableCell>{usuario.tipodocumento}</TableCell>
                  <TableCell>{usuario.numerodocumento}</TableCell>
                  <TableCell>
                    {usuario.activo ? "Activo" : "Inactivo"}
                  </TableCell>
                  <TableCell>
                    <Tooltip title="Editar">
                      <ModeEditOutlineTwoToneIcon
                        className={styles.iconos}
                        onClick={() =>
                          history.push(`/EditarUsuario/${usuario._id}`)
                        }
                      />
                    </Tooltip>
                    &nbsp;&nbsp;&nbsp;
                    {usuario.activo ? (
                      <Tooltip title="Deshabilitar">
                        <NotInterestedIcon
                          className={styles.iconos}
                          onClick={() => cambiarHabilitacion(usuario)}
                        />
                      </Tooltip>
                    ) : (
                      <Tooltip title="Habilitar">
                        <CheckOutlinedIcon
                          className={styles.iconos}
                          onClick={() => cambiarHabilitacion(usuario)}
                        />
                      </Tooltip>
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Grid>
    </Box>
    //</div>
  );
}
