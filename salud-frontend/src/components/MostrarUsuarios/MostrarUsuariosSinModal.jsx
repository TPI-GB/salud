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
//import Pagination from "./Pagination";

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
  const [loading, setLoading] = useState(false);

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
      <div className="botonNuevoUsuario">
        <MiBuscador
          //className="derecha"
          setUsuarios={setUsuarios}
          setLoading={setLoading}
        />

        <Button
          //justify-content="space-between"
          //className="box"
          //className="izquierda"
          variant="contained"
          style={{
            background: "#008f4c",
            // marginTop: "7px",
            // marginLeft: "500px",
          }}
          href="/NuevoUsuario"
        >
          <AddIcon /> Nuevo usuario
        </Button>
      </div>

      <div className="tituloTabla">
        <h1 className="flexbox">Usuarios actuales</h1>
      </div>
      {!loading && (
        <MiTabla
          usuariosTotales={usuarios}
          miFuncion={cambiarHabilitacion}
          loading={loading}
        />
      )}
    </Box>
    //</div>
  );
}

function MiTabla(props) {
  const { usuariosTotales, miFuncion, loading } = props;

  const styles = useStyles();
  const history = useHistory();

  //definiendo cosas para paginar
  const [persons, setPersons] = useState(usuariosTotales.slice(0, 5));
  const [page, setPage] = useState(1);

  // useEffect(() => {
  //   setPersons(paginatedData(0, 5));
  //   console.log(persons);
  //   console.log(paginatedData(0, 5));
  // }, []);
  //probando lo de martin

  function pageCount() {
    if (usuariosTotales.length % 5 >= 1) {
      return Math.floor(usuariosTotales.length / 5) + 1;
    } else {
      return Math.floor(usuariosTotales.length / 5);
    }
  }
  function paginatedData(pageNumber, pageSize) {
    return usuariosTotales.slice(
      (pageNumber - 1) * pageSize,
      pageNumber * pageSize
    );
  }

  function handleChange(event, value) {
    setPersons(paginatedData(value, 5));
    setPage(value);
  }

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
          {persons.map((usuario) => (
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
        {usuariosTotales.length / 5 > 1 && (
          <Pagination
            count={pageCount()}
            page={page}
            variant="outlined"
            color="primary"
            onChange={handleChange}
          />
        )}
      </Table>
    </TableContainer>
  );
}

function MiBuscador(props) {
  const styles = useStyles();
  const { className, setUsuarios, setLoading } = props;

  const [primarySearchValue, setPrimaryprimarySearchValue] = useState("");
  const [filter, setFilter] = useState("DOC");
  const [docType, setDocType] = useState("DNI");
  const [error, setError] = useState({ message: "", show: false });

  const validateSearchInput = () => {
    if (!/^(?!\s*$).+/.test(primarySearchValue)) {
      setError({
        message: "El campo de busqueda esta vacío, ingrese un número.",
        show: true,
      });
    } else if (!/^[1-9][0-9]{6,8}$/i.test(primarySearchValue)) {
      setError({
        message: "En numero de documento ingresado es inválido.",
        show: true,
      });
    } else {
      handleSearch();
    }
  };
  const handleSearch = async () => {
    setLoading(true);
    if (filter === "TODAS") {
      const response = await getUsers();
      setUsuarios(response.data);
    } else {
      const response = await getUserByDocument(docType, primarySearchValue);
      setUsuarios(response.data ? [response.data] : []);
    }
    setError({ show: false });
    setLoading(false);
  };

  const handleSearchChange = (event) => {
    setPrimaryprimarySearchValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    setError({ show: false });
    if (value === "TODAS") {
      setPrimaryprimarySearchValue("");
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
          //justifyContent: "center",
          //alignItems: "center",
          minWidth: 300,
          maxWidth: 350,
          // mt: 1,
          // ml: 0,
          // mr: "auto",
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
          value={primarySearchValue}
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
