import {
  updateUser,
  getUsers,
  getUserById,
  getUserByDocument,
} from "../../services/user-service";
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
  IconButton,
  Divider,
  InputBase,
  Pagination,
} from "@mui/material";
import { Link } from "react-router-dom";
import AddIcon from "@mui/icons-material/Add";
import SearchIcon from "@mui/icons-material/Search";
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
import AppBar from "@mui/material/AppBar";
import { yellow } from "@mui/material/colors";

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
  estiloBuscador: {
    backgroundColor: "green",
  },
});

export default function PinnedSubheaderList() {
  const { register } = useForm();
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
    setUsuarios(response.data);
  }

  const abrirCerrarModalEditar = () => {
    setModalEditar(!modalEditar);
  };

  // useEffect(() => {
  //   getData();
  // }, []);

  useEffect(() => {}, [usuarioSeleccionado.roles]);

  function manejarCerrar() {
    setModalEditar(!modalEditar);
    setMostrarConfirmacionAlEditar(false);
  }

  const [usuarios, setUsuarios] = useState([]);

  const cambiarHabilitacion = async (usuario) => {
    await updateUser(usuario._id, { activo: !usuario.activo });
    getData();
  };

  return (
    //<div className="App">
    <Box component="form">
      <Grid container>
        <div className="botonNuevoUsuario">
          <Button
            className="izquierda"
            variant="contained"
            style={{ background: "#008f4c" }}
            href="/NuevoUsuario"
          >
            <AddIcon /> Nuevo usuario
          </Button>

          <MiBuscador className="derecha" setUsuarios={setUsuarios} />
        </div>

        <div className="tituloTabla">
          <h1 align="center">Usuarios actuales</h1>
        </div>
        <MiTabla usuariosTotales={usuarios} miFuncion={cambiarHabilitacion} />
      </Grid>
    </Box>
    //</div>
  );
}

function MiTabla(props) {
  const { usuariosTotales, miFuncion } = props;

  const styles = useStyles();
  const history = useHistory();

  //definiendo cosas para paginar
  const [persons, setPersons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [personsPerPage, setPersonsPerPage] = useState(5);

  useEffect(() => {
    const fetchPersons = async () => {
      setLoading(true);
      const res = await axios.get(`http://localhost:8080/users`);
      setPersons(res.data);
      setLoading(false);
    };

    fetchPersons();
  }, []);

  console.log(persons);
  //get current persons
  const indexOfLastPerson = currentPage * personsPerPage;
  const indexOfFirstPerson = indexOfLastPerson - personsPerPage;
  const currentPersons = usuariosTotales.slice(
    indexOfFirstPerson,
    indexOfLastPerson
  );

  return (
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
          {currentPersons.map((usuario) => (
            <TableRow key={usuario._id}>
              <TableCell>{usuario.nombre}</TableCell>
              <TableCell>{usuario.apellido}</TableCell>
              <TableCell>{usuario.tipodocumento}</TableCell>
              <TableCell>{usuario.numerodocumento}</TableCell>
              <TableCell>{usuario.activo ? "Activo" : "Inactivo"}</TableCell>
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
                      onClick={() => miFuncion(usuario)}
                    />
                  </Tooltip>
                ) : (
                  <Tooltip title="Habilitar">
                    <CheckOutlinedIcon
                      className={styles.iconos}
                      onClick={() => miFuncion(usuario)}
                    />
                  </Tooltip>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

function MiBuscador(props) {
  const styles = useStyles();
  const { className, setUsuarios } = props;

  const [searchValue, setSearchValue] = useState("");
  const [filter, setFilter] = useState("DOC");
  const [docType, setDocType] = useState("DNI");
  const [error, setError] = useState({ message: "", show: false });

  const validateSearchInput = () => {
    if (!/^(?!\s*$).+/.test(searchValue)) {
      setError({
        message: "El campo de busqueda esta vacío, ingrese un número.",
        show: true,
      });
    } else if (!/^[1-9][0-9]{6,8}$/i.test(searchValue)) {
      setError({
        message: "En numero de documento ingresado es inválido.",
        show: true,
      });
    } else {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    if (filter === "TODAS") {
      const response = await getUsers();
      setUsuarios(response.data);
    } else {
      const response = await getUserByDocument(docType, searchValue);
      setUsuarios(response.data ? [response.data] : []);
    }
    setError({ show: false });
  };

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    setError({ show: false });
    if (value === "TODAS") {
      setSearchValue("");
    }
  };

  const handleDocChange = (event) => {
    setDocType(event.target.value);
    setError({ show: false });
  };

  return (
    <>
      <Paper
        component="form"
        sx={{
          p: "0px 4px",
          display: "flex",
          alignItems: "center",
          minWidth: 300,
          maxWidth: 350,
          mt: -5,
          ml: 3,
          mr: "auto",
          backgroundColor: "#008f4c",
        }}
        className={className}
        //className={styles.estiloBuscador}
      >
        <Select
          value={filter}
          onChange={handleFilterChange}
          size="small"
          sx={{ ml: 0.5, color: "#ffffff" }}
          //color="#ffffff"
        >
          <MenuItem value={"DOC"}>DOC</MenuItem>
          <MenuItem value={"TODAS"}>TODAS</MenuItem>
        </Select>

        {filter === "DOC" && (
          <Select
            value={docType}
            onChange={handleDocChange}
            size="small"
            sx={{ ml: 0.5, color: "#ffffff" }}
          >
            <MenuItem value={"DNI"}>DNI</MenuItem>
            <MenuItem value={"LE"}>LE</MenuItem>
            <MenuItem value={"LC"}>LC</MenuItem>
            <MenuItem value={"CI"}>CI</MenuItem>
          </Select>
        )}
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <InputBase
          sx={{ ml: 1, flex: 1, color: "#ffffff" }}
          placeholder="Buscar..."
          onChange={handleSearchChange}
          disabled={filter === "TODAS"}
          value={searchValue}
        />
        <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
        <IconButton
          type="button"
          sx={{ p: "10px", color: "#ffffff" }}
          aria-label="search"
          onClick={filter === "TODAS" ? handleSearch : validateSearchInput}
        >
          <SearchIcon />
        </IconButton>
      </Paper>
      <Box
        sx={{
          ml: "auto",
          mr: "auto",
          mt: "5px",
          minWidth: 300,
          maxWidth: 500,
        }}
      >
        <Collapse in={error.show}>
          <Alert
            severity="error"
            sx={{ borderRadius: "25px", mt: 1 }}
            onClose={() => {
              setError({ message: "", show: false });
            }}
          >
            {error.message}
          </Alert>
        </Collapse>
      </Box>
    </>
  );
}
