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
} from "@mui/material";
import axios from "axios";
import ModeEditOutlineTwoToneIcon from "@mui/icons-material/ModeEditOutlineTwoTone";
import NotInterestedIcon from "@mui/icons-material/NotInterested";
import CheckOutlinedIcon from "@mui/icons-material/CheckOutlined";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
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
  const styles = useStyles();
  const [data, setData] = useState([]);
  const [modalEditar, setModalEditar] = useState(false);
  const [modalInhabilitar, setModalInhabilitar] = useState(false);
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

  //prueba
  const [usuarioSeleccionadoInhabilitar, setUsuarioSeleccionadoInhabilitar] =
    useState({
      _id: "",
      activo: "",
    });
  const checkedAux = (rol, roles) => {
    return roles.includes(rol);
  };

  const [laboratorio, setLaboratorio] = useState(false);
  const [recepcion, setRecepcion] = useState(false);
  const [secretaria, setSecretaria] = useState(false);
  const [director, setDirector] = useState(false);
  const [admin, setAdmin] = useState(false);
  const [medico, setMedico] = useState(false);

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

  const peticionPut = async (usuarioActualizado) => {
    //updateUser(usuario._id)
    await axios
      .put(baseUrl + usuarioActualizado._id, usuarioActualizado)
      .then((response) => {
        var dataNueva = data;
        dataNueva.map((usuario) => {
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
        abrirCerrarModalEditar();
      });
  };

  //prueba de inhabilitar un usuario
  async function getData() {
    const response = await getUsers();
    setData(response.data);
  }

  const cambiarHabilitacion = (usuario) => {
    updateUser(usuario._id, { activo: !usuario.activo });
    getData();
  };
  //prueba inhabilitar
  const abrirCerrarModalInhabilitar = () => {
    setModalInhabilitar(!modalInhabilitar);
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
  }, [data]);

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

  function handleAdminChange(event) {
    setAdmin(event.target.checked);

    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("admin")) {
        usuarioSeleccionado.roles.push("admin");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != "admin"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }

  function handleLaboratorioChange(event) {
    setLaboratorio(event.target.checked);

    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("laboratorio")) {
        usuarioSeleccionado.roles.push("laboratorio");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != "laboratorio"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleSecretariaChange(event) {
    setSecretaria(event.target.checked);

    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("secretaria")) {
        usuarioSeleccionado.roles.push("secretaria");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != "secretaria"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleMedicoChange(event) {
    setMedico(event.target.checked);

    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("medico")) {
        usuarioSeleccionado.roles.push("medico");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != "medico"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleRecepcionChange(event) {
    setRecepcion(event.target.checked);

    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("recepcion")) {
        usuarioSeleccionado.roles.push("recepcion");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != "recepcion"
      );
      setUsuarioSeleccionado(usuarioSeleccionado);
      console.log(usuarioSeleccionado.roles);
    }
  }
  function handleDirectorChange(event) {
    setDirector(event.target.checked);

    if (event.target.checked) {
      if (!usuarioSeleccionado.roles.includes("director")) {
        usuarioSeleccionado.roles.push("director");
      }
      console.log(usuarioSeleccionado.roles);
      setUsuarioSeleccionado(usuarioSeleccionado);
    } else {
      usuarioSeleccionado.roles = usuarioSeleccionado.roles.filter(
        (rol) => rol != "director"
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
        value={
          usuarioSeleccionado && usuarioSeleccionado.activo
            ? "Activo"
            : "Inactivo"
        }
      />
      <br />

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
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={checkedAux("recepcion", usuarioSeleccionado.roles)}
            onChange={handleRecepcionChange}
          />
        }
        label="Recepcion"
        value="recepcion"
        {...register("roles")}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={checkedAux("secretaria", usuarioSeleccionado.roles)}
            onChange={handleSecretariaChange}
          />
        }
        label="Secretaria"
        value="secretaria"
        {...register("roles")}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={checkedAux("director", usuarioSeleccionado.roles)}
            onChange={handleDirectorChange}
          />
        }
        label="Director"
        value="director"
        {...register("roles")}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={checkedAux("admin", usuarioSeleccionado.roles)}
            onChange={handleAdminChange}
          />
        }
        label="Admin"
        value="admin"
        {...register("roles")}
      />
      <FormControlLabel
        control={
          <Checkbox
            defaultChecked={checkedAux("medico", usuarioSeleccionado.roles)}
            onChange={handleMedicoChange}
          />
        }
        label="Médico"
        value="medico"
        {...register("roles")}
      />
      <br />
      <br />
      <TextField
        name="tipodocumento"
        className={styles.inputMaterial}
        label="Tipo documento"
        onChange={handleChange}
        value={usuarioSeleccionado && usuarioSeleccionado.tipodocumento}
      />
      <br />
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
        <Button
          color="primary"
          onClick={() => peticionPut(usuarioSeleccionado)}
        >
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
              <TableRow key={usuario._id}>
                <TableCell>{usuario.nombre}</TableCell>
                <TableCell>{usuario.apellido}</TableCell>
                <TableCell>{usuario.tipodocumento}</TableCell>
                <TableCell>{usuario.numerodocumento}</TableCell>
                <TableCell>{usuario.activo ? "Activo" : "Inactivo"}</TableCell>
                <TableCell>
                  <ModeEditOutlineTwoToneIcon
                    className={styles.iconos}
                    onClick={() => seleccionarUsuario(usuario, "Editar")}
                  />
                  &nbsp;&nbsp;&nbsp;
                  {usuario.activo ? (
                    <NotInterestedIcon
                      className={styles.iconos}
                      onClick={() => cambiarHabilitacion(usuario)}
                    />
                  ) : (
                    <CheckOutlinedIcon
                      className={styles.iconos}
                      onClick={() => cambiarHabilitacion(usuario)}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Modal
        className={styles.modal}
        open={modalEditar}
        onClose={abrirCerrarModalEditar}
      >
        {bodyEditar}
      </Modal>
    </div>
  );
}
