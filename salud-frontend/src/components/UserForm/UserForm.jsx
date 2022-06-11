import React, { useState, useEffect } from "react";
import { getUserById } from "../../services/user-service";
import { Link, useHistory } from "react-router-dom";
import Checkbox from "@mui/material/Checkbox";
import { useForm } from "react-hook-form";
import swal from "sweetalert";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
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

const schema = yup
  .object()
  .shape({
    email: yup
      .string()
      .email("Please enter a valid email")
      .required("Email is required"),
    tipodocumento: yup.string().required("is required"),
    numerodocumento: yup
      .string()
      .matches(/^[1-9][0-9]{6,8}$/i, "Is not in correct format")
      .required("is required"),
    nombre: yup.string().required("is required"),
    apellido: yup.string().required("is required"),
    showValidarContrasenia: yup.boolean(),
    contrasenia: yup.string().required("is required").min(6),
    roles: yup.array().min(1, "falta"),
  })
  .required();

const schema2 = yup.object().shape({
  email: yup
    .string()
    .email("Please enter a valid email")
    .required("Email is required"),
  tipodocumento: yup.string().required("is required"),
  numerodocumento: yup
    .string()
    .matches(/^[1-9][0-9]{6,8}$/i, "Is not in correct format")
    .required("is required"),
  nombre: yup.string().required("is required"),
  apellido: yup.string().required("is required"),
  roles: yup.array().min(1, "falta"),
});

export default function UserForm(props) {
  const history = useHistory();
  const { buttonText, id } = props;
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(!id ? schema : schema2),
  });
  const onSubmit = async (data) => {
    if (!id && verificarContrasenias()) {
      createUser(data)
        .then(() => {
          mostrarAlertaConfirmacion();
          history.push("/Usuarios");
        })
        .catch(() => mostrarAlertaError());
    } else {
      updateUser(id, data)
        .then(() => {
          mostrarAlertaEdicion();
          history.push("/Usuarios");
        })
        .catch(() => mostrarAlertaError());
    }
  };

  const [mensajeContrasenia, setMensajeContrasenia] = useState({
    show: false,
    message: "",
  });

  function verificarContrasenias() {
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

  const [email, setEmail] = useState("");
  const [tipodocumento, setTipoDocumento] = useState("");
  const [numerodocumento, setNumeroDocumento] = useState("");
  const [nombre, setNombre] = useState("");
  const [apellido, setApellido] = useState("");
  const [roles, setRoles] = useState({
    Medico: false,
    Admin: false,
    Secretaria: false,
    Director: false,
    Laboratorio: false,
    Recepcion: false,
  });
  const [contrasenia, setContrasenia] = useState("");

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
      reset({
        email: response.data.email,
        nombre: response.data.nombre,
        tipodocumento: response.data.tipodocumento,
        numerodocumento: response.data.numerodocumento,
        apellido: response.data.apellido,
        roles: response.data.roles,
      });
      setRoles({
        Medico: response.data.roles.includes("Medico"),
        Admin: response.data.roles.includes("Admin"),
        Secretaria: response.data.roles.includes("Secretaria"),
        Director: response.data.roles.includes("Director"),
        Laboratorio: response.data.roles.includes("Laboratorio"),
        Recepcion: response.data.roles.includes("Recepcion"),
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
                placeholder="ejemplo@gmail.com"
                {...register("email", {
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
                    {...register("tipodocumento", {
                      required: {
                        value: true,
                        message: "Necesitas este campo",
                      },
                      onChange: (event) => {
                        setTipoDocumento(event.target.value);
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
                {...register("nombre", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  onChange: (event) => {
                    setNombre(event.target.value);
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
                {...register("apellido", {
                  required: {
                    value: true,
                    message: "El campo es requerido",
                  },
                  onChange: (event) => {
                    setApellido(event.target.value);
                  },
                })}
                error={Boolean(errors.apellido)}
                helperText={errors.apellido?.message}
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              />

              <div sx={{ mt: "8px", width: "100%" }}>
                <br />
                Roles: <br />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Laboratorio"
                  value="Laboratorio"
                  checked={roles.Laboratorio}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Recepción"
                  value="Recepcion"
                  checked={roles.Recepcion}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Secretaria"
                  value="Secretaria"
                  checked={roles.Secretaria}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Director"
                  value="Director"
                  checked={roles.Director}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Admin"
                  value="Admin"
                  checked={roles.Admin}
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Médico"
                  value="Medico"
                  checked={roles.Medico}
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
                    type="password"
                    label="Contraseña"
                    {...register("contrasenia", {
                      onChange: (event) => {
                        setContrasenia(event.target.value);
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
                to="/Usuarios"
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
