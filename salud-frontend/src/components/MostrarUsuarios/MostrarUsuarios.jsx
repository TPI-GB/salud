import { updateUser, getUsers } from "../../services/user-service";
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
} from "@mui/material";
import axios from "axios";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { useForm } from "react-hook-form";
import Tooltip from "@mui/material/Tooltip";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import Box from "@mui/material/Box";

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
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [mostrarConfirmacionAlEditar, setMostrarConfirmacionAlEditar] =
    useState(false);

  const [probar, setProbar] = useState({ show: false, message: "" });
  const onSubmit = (data) => verificarContrasenias(data);

  function verificarContrasenias(data) {
    var p1 = document.getElementById("contraseniaid1").value;
    var p2 = document.getElementById("confirmContrasenia").value;
    console.log(p1);
    console.log(p2);
    if (p1 !== p2) {
      setProbar({ show: true, message: "Contraseñas no concuerdan" });
    } else {
      setProbar({ show: false, message: "" });
      //createUser(data);
    }
  }

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
    console.log(usuarioSeleccionado);
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
            console.log(usuarioActualizado.roles);
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

  //prueba de inhabilitar un usuario
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

  const seleccionarUsuario = (usuario, caso) => {
    setUsuarioSeleccionado(usuario);
    caso === "Editar" && setModalEditar(true);
  };

  useEffect(() => {
    //await peticionGet();
    getData();
  }, []);

  useEffect(() => {}, [usuarioSeleccionado.roles]);

  function handleAdminChange(event) {
    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("admin")) {
        usuarioSeleccionado.roles.push("admin");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol !== "admin"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }

  function handleLaboratorioChange(event) {
    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("laboratorio")) {
        usuarioSeleccionado.roles.push("laboratorio");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol !== "laboratorio"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleSecretariaChange(event) {
    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("secretaria")) {
        usuarioSeleccionado.roles.push("secretaria");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol !== "secretaria"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleMedicoChange(event) {
    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("medico")) {
        usuarioSeleccionado.roles.push("medico");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol !== "medico"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleRecepcionChange(event) {
    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("recepcion")) {
        usuarioSeleccionado.roles.push("recepcion");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol !== "recepcion"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleDirectorChange(event) {
    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("director")) {
        usuarioSeleccionado.roles.push("director");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol !== "director"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }

  function manejarCerrar() {
    setModalEditar(!modalEditar);
    setMostrarConfirmacionAlEditar(false);
  }

  const bodyEditar = (
    <div>
      <Card className="PruebaAux" sx={{ minWidth: 275 }}>
        <FormControl onSubmit={handleSubmit(onSubmit)}>
          <Box
            textAlign="center"
            component="form"
            sx={{
              flexGrow: 1,
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h1>Editar usuario</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  name="email"
                  className={styles.inputMaterial}
                  label="Email"
                  onChange={handleChange}
                  value={usuarioSeleccionado && usuarioSeleccionado.email}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl sx={{ width: 80, mt: 1, ml: 1, mr: 0 }}>
                  <Select
                    className="col-2"
                    name="tipodocumento"
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue="DNI"
                    onChange={handleChange}
                    value={
                      usuarioSeleccionado && usuarioSeleccionado.tipodocumento
                    }
                    //{...register("tipodocumento", {})}
                  >
                    <MenuItem value={"DNI"}>DNI</MenuItem>
                    <MenuItem value={"Libreta de enrolamiento LE"}>
                      Libreta de enrolamiento LE
                    </MenuItem>
                    <MenuItem value={"Libreta cívica LC"}>
                      Libreta cívica LC
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  name="numerodocumento"
                  className={styles.inputMaterial}
                  label="Numero documento"
                  onChange={handleChange}
                  value={
                    usuarioSeleccionado && usuarioSeleccionado.numerodocumento
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  name="apellido"
                  className={styles.inputMaterial}
                  label="Apellido"
                  onChange={handleChange}
                  value={usuarioSeleccionado && usuarioSeleccionado.apellido}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  name="nombre"
                  className={styles.inputMaterial}
                  label="Nombre"
                  onChange={handleChange}
                  value={usuarioSeleccionado && usuarioSeleccionado.nombre}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="contraseniaid1"
                  onChange="contraseniaid1"
                  type="password"
                  //pattern=".{6}"
                  label="Contraseña"
                  {...register("contrasenia", {
                    required: {
                      value: true,
                      message: "El campo es requerido",
                    },
                    minLength: {
                      value: 6,
                      message: "La contraseña debe tener al menos 6 caracteres",
                    },
                  })}
                  error={Boolean(errors.contrasenia)}
                  helperText={errors.contrasenia?.message}
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <TextField
                  id="confirmContrasenia"
                  type="password"
                  label="Confirmar contraseña"
                  error={probar.show}
                  helperText={probar.message}
                />
              </Grid>

              <div>
                Roles:
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={checkedAux(
                            "laboratorio",
                            usuarioSeleccionado.roles
                          )}
                          onChange={handleLaboratorioChange}
                        />
                      }
                      label="Laboratorio"
                      value="laboratorio"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={checkedAux(
                            "recepcion",
                            usuarioSeleccionado.roles
                          )}
                          onChange={handleLaboratorioChange}
                        />
                      }
                      label="Recepción"
                      value="recepcion"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={checkedAux(
                            "secretaria",
                            usuarioSeleccionado.roles
                          )}
                          onChange={handleSecretariaChange}
                        />
                      }
                      label="Secretaria"
                      value="secretaria"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={checkedAux(
                            "director",
                            usuarioSeleccionado.roles
                          )}
                          onChange={handleDirectorChange}
                        />
                      }
                      label="Director"
                      value="director"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={checkedAux(
                            "admin",
                            usuarioSeleccionado.roles
                          )}
                          onChange={handleAdminChange}
                        />
                      }
                      label="Admin"
                      value="admin"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={
                        <Checkbox
                          defaultChecked={checkedAux(
                            "medico",
                            usuarioSeleccionado.roles
                          )}
                          onChange={handleMedicoChange}
                        />
                      }
                      label="Médico"
                      value="medico"
                      {...register("roles")}
                    />
                  </Grid>
                </Grid>
              </div>
              <Grid item xs={12} sm={12} md={12} lg={12} xl={12}>
                <Button
                  onClick={handleSubmit(onSubmit)}
                  variant="contained"
                  color="success"
                >
                  Editar
                </Button>
                {/* <Button onClick={handleClose} variant="contained" color="error">
                  Cancelar
                </Button> */}
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      </Card>
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
                      onClick={() => seleccionarUsuario(usuario, "Editar")}
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
      <Modal open={modalEditar} onClose={abrirCerrarModalEditar}>
        {bodyEditar}
      </Modal>
    </div>
  );
}
