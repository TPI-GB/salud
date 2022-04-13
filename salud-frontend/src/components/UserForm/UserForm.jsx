import React, { useState, useEffect } from "react";
import { getUserById } from "../../services/user-service";
import { Link, useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Grid,
  FormControl,
  FormControlLabel,
} from "@mui/material";
import { createUser, updateUser } from "../../services/user-service";
import "./UserForm.scss";

export default function UserForm(props) {
  const history = useHistory();
  const { buttonText, id } = props;
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ mode: "onBlur" });
  const onSubmit = async (data) => {
    console.log("onSubmit");
    //var verificoContrasena = await verificarContrasenias(data);
    //var verificoMail = await verificarEmail(data);
    // var verificoTipoDocumento = await verificarTipoDocumento(data);
    // var verificoNumeroDocumento = await verificarNumeroDocumento(data);
    // var verificoNombre = await verificarNombre(data);
    // var verificoApellido = await verificarApellido(data);
    console.log(!(await verificarContrasenias(data)));
    if (
      await verificarContrasenias(data)
      //&&
      //verificoMail
      // &&
      // verificoTipoDocumento &&
      // verificoNumeroDocumento &&
      // verificoNombre &&
      // verificoApellido
    ) {
      let response = id ? await updateUser(id, data) : await createUser(data);
      if (id) {
        updateUser(id, data)
          .then(() => {
            mostrarAlertaConfirmacion();
            history.push("/MostrarUsuarios");
          })
          .catch(() => mostrarAlertaError());
      } else {
        createUser(data)
          .then(() => {
            mostrarAlertaConfirmacion();
            history.push("/MostrarUsuarios");
          })
          .catch(() => mostrarAlertaError());
      }
    }
  };

  const [mensajeContrasenia, setMensajeContrasenia] = useState({
    show: false,
    message: "",
  });
  const [mensajeEmail, setMensajeEmail] = useState({
    show: false,
    message: "",
  });
  const [mensajeTipoDocumento, setMensajeTipoDocumento] = useState({
    show: false,
    message: "",
  });
  const [mensajeNumeroDocumento, setMensajeNumeroDocumento] = useState({
    show: false,
    message: "",
  });
  const [mensajeNombre, setMensajeNombre] = useState({
    show: false,
    message: "",
  });
  const [mensajeApellido, setMensajeApellido] = useState({
    show: false,
    message: "",
  });

  async function verificarContrasenias(data) {
    var contra1 = document.getElementById("contraseniaid1").value;
    var contra2 = document.getElementById("confirmContrasenia").value;
    if (contra1 !== contra2) {
      setMensajeContrasenia({
        show: true,
        message: "Contraseñas no concuerdan",
      });
      return false;
    } else {
      setMensajeContrasenia({ show: false, message: "" });
      return true;
    }
  }
  //FALTAN DESARROLLAR ESTAS FUNCIONES PARA LOS CAMPOS REQUERIDOS USANDO REGEX EXPRESIONES REGULARES QUE ME DIJO FEDE

  // async function verificarEmail(data) {
  //   // value: true,
  //   // message: "Necesitas este campo",
  //   // pattern: {
  //   //   value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
  //   //   message: "El formato no es correcto",
  //   // },
  //   // var campoDeMail = document.getElementById("emailid").value;
  //   if (campoDeMail == null) {
  //     setMensajeEmail({
  //       show: true,
  //       mensaje: "Necesitas este campo",
  //     });
  //   } else {
  //     setMensajeEmail({ show: false, mensaje: "" });
  //   }
  //   if (!campoDeMail.test(/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i)) {
  //     setMensajeEmail({
  //       show: true,
  //       mensaje: "El formato no es correcto",
  //     });
  //   } else {
  //     setMensajeEmail({ show: false, mensaje: "" });
  //   }
  // }

  async function verificarTipoDocumento(data) {}

  async function verificarNumeroDocumento(data) {}

  async function verificarNombre(data) {}

  async function verificarApellido(data) {}

  const [email, setEmail] = useState("");
  const [tipodocumento, setTipoDocumento] = useState("");
  const [numerodocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [roles, setRoles] = useState({
    medico: false,
    admin: false,
    secretaria: false,
    director: false,
    laboratorio: false,
    recepcion: false,
  });
  const [contrasenia, setContrasenia] = useState("");

  //falta todos los atributos

  const mostrarAlertaConfirmacion = () => {
    swal({
      title: "Creación exitosa",
      icon: "success",
      button: "Aceptar",
    });
  };

  const mostrarAlertaEdicion = () => {
    swal({
      title: "Edición exitosa",
      icon: "success",
      button: "Aceptar",
    });
  };

  const mostrarAlertaError = () => {
    swal({
      title: "Fallo la llamada al servidor. Intente mas tarde.",
      icon: "error",
      button: "Aceptar",
    });
  };

  useEffect(() => {
    const getData = async () => {
      const response = await getUserById(id);
      setEmail(response.data.email); //falta poner los sets aca
      setTipoDocumento(response.data.tipodocumento);
      setNumeroDocumento(response.data.numerodocumento);
      setNombre(response.data.nombre);
      setApellido(response.data.apellido);
      setContrasenia(response.data.contrasenia);
      setRoles({
        medico: response.data.roles.includes("medico"),
        admin: response.data.roles.includes("admin"),
        secretaria: response.data.roles.includes("secretaria"),
        director: response.data.roles.includes("director"),
        laboratorio: response.data.roles.includes("laboratorio"),
        recepcion: response.data.roles.includes("recepcion"),
      });
    };
    if (id) {
      getData();
    }
  }, []);

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
      <Box component="form">
        <Grid container>
          <Grid item xs={6}>
            <Box className="fieldsContainer">
              <TextField
                id="emailid"
                type="email"
                label="Mail"
                value={email}
                placeholder="ejemplo@gmail.com"
                {...register("email", {
                  required: {
                    value: true,
                    message: "Necesitas este campo",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El formato no es correcto",
                  },
                  onChange: (event) => {
                    setEmail(event.target.value);
                  },
                })}
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              />
              <FormControl sx={{ width: "100%" }}>
                <Box sx={{ display: "flex" }}>
                  <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    defaultValue="DNI"
                    value={tipodocumento}
                    {...register("tipodocumento", {
                      required: {
                        value: true,
                        message: "Necesitas este campo",
                      },
                      onChange: (event) => {
                        setTipoDocumento(event.target.value);
                        console.log(tipodocumento);
                      },
                    })}
                    error={Boolean(errors.tipodocumento)}
                    helperText={errors.tipodocumento?.message}
                    sx={{
                      mt: "8px",
                      mb: "4px",
                      marginRight: "5px",
                      minWidth: "80px",
                      maxWidth: "80px",
                    }}
                  >
                    <MenuItem value={"DNI"}>DNI</MenuItem>
                    <MenuItem value={"LE"}>LE</MenuItem>
                    <MenuItem value={"LC"}>LC</MenuItem>
                    <MenuItem value={"CI"}>CI</MenuItem>
                  </Select>
                  <TextField
                    id="numDocid"
                    type="text"
                    label="Numero de documento"
                    value={numerodocumento}
                    {...register("numerodocumento", {
                      required: {
                        value: true,
                        message: "Necesitas este campo",
                      },
                      pattern: {
                        value: /^[1-9][0-9]{6,8}$/i,
                        message: "El formato no es correcto",
                      },
                      onChange: (event) => {
                        setNumeroDocumento(event.target.value);
                      },
                    })}
                    error={Boolean(errors.numerodocumento)}
                    helperText={errors.numerodocumento?.message}
                    sx={{ mt: "8px", mb: "4px", width: "100%" }}
                  />
                </Box>
              </FormControl>

              <TextField
                id="nombreid"
                type="text"
                label="Nombre"
                value={nombre}
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  onChange: (event) => {
                    setNombre(event.target.value);
                    console.log(nombre);
                  },
                })}
                error={Boolean(errors.nombre)}
                helperText={errors.nombre?.message}
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              />

              <TextField
                id="apellidoid"
                type="text"
                label="Apellido"
                value={apellido}
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  onChange: (event) => {
                    setApellido(event.target.value);
                    console.log(apellido);
                  },
                })}
                error={Boolean(errors.apellido)}
                helperText={errors.apellido?.message}
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              />

              <div sx={{ mt: "8px", width: "100%" }}>
                Roles:
                <FormControlLabel
                  control={<Checkbox />}
                  label="Laboratorio"
                  value="laboratorio"
                  checked={roles.laboratorio}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Recepción"
                  value="recepcion"
                  checked={roles.recepcion}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Secretaria"
                  value="secretaria"
                  checked={roles.secretaria}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Director"
                  value="director"
                  checked={roles.director}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Admin"
                  value="admin"
                  checked={roles.admin}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Médico"
                  value="medico"
                  checked={roles.medico}
                  {...register("roles", {
                    onChange: (event) => {
                      roles[event.target.value] = event.target.checked;
                      setRoles({ ...roles });
                    },
                  })}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="fieldsContainer">
              {!id && (
                <>
                  <TextField
                    id="contraseniaid1"
                    //onChange="contraseniaid1"
                    type="password"
                    //pattern=".{6}"
                    label="Contraseña"
                    {...register("contrasenia", {
                      required: {
                        value: id ? false : true,
                        message: "El campo es requerido",
                      },
                      minLength: {
                        value: 6,
                        message:
                          "La contraseña debe tener al menos 6 caracteres",
                      },
                      onChange: (event) => {
                        setContrasenia(event.target.value);
                        console.log(contrasenia);
                      },
                    })}
                    error={Boolean(errors.contrasenia)}
                    helperText={errors.contrasenia?.message}
                    sx={{ mt: "8px", mb: "4px", width: "100%" }}
                  />
                  <TextField
                    id="confirmContrasenia"
                    type="password"
                    label="Confirmar contraseña"
                    error={mensajeContrasenia.show}
                    helperText={mensajeContrasenia.message}
                    sx={{ mt: "8px", mb: "4px", width: "100%" }}
                  />
                </>
              )}
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              >
                {buttonText}
              </Button>

              <Button
                type="button"
                variant="contained"
                color="error"
                component={Link}
                to="/MostrarUsuarios"
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              >
                Cancelar
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </FormControl>
  );
}
