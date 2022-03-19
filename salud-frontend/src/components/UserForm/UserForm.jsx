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
  } = useForm();
  const onSubmit = async (data) => {
    console.log("onSubmit");
    await verificarContrasenias(data);
  };
  const [probar, setProbar] = useState({ show: false, message: "" });
  async function verificarContrasenias(data) {
    var p1 = document.getElementById("contraseniaid1").value;
    var p2 = document.getElementById("confirmContrasenia").value;
    if (p1 !== p2) {
      setProbar({ show: true, message: "Contraseñas no concuerdan" });
    } else {
      setProbar({ show: false, message: "" });
      let response = await createUser(data);
      if (response === 0) {
        mostrarAlertaConfirmacion();
        history.push("/MostrarUsuarios");
      } else mostrarAlertaError();
    }
  }

  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "success",
  });

  const mostrarAlertaConfirmacion = () => {
    swal({
      title: "Creación exitosa",
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
                  required: {
                    value: true,
                    message: "Necesitas este campo",
                  },
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                    message: "El formato no es correcto",
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
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Recepción"
                  value="recepcion"
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Secretaria"
                  value="secretaria"
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Director"
                  value="director"
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Admin"
                  value="admin"
                  {...register("roles")}
                />
                <FormControlLabel
                  control={<Checkbox />}
                  label="Médico"
                  value="medico"
                  {...register("roles")}
                />
              </div>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box className="fieldsContainer">
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
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              />
              <TextField
                id="confirmContrasenia"
                type="password"
                label="Confirmar contraseña"
                error={probar.show}
                helperText={probar.message}
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              />
              <Button
                type="submit"
                variant="contained"
                color="success"
                sx={{ mt: "8px", mb: "4px", width: "100%" }}
              >
                Crear
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
