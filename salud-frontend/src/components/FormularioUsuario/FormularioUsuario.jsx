import { useForm } from "react-hook-form";
import { FormControlLabel } from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import { createUser } from "../../services/user-service";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import "./FormularioUsuario.scss";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Grid from "@mui/material/Grid";
import { Link } from "react-router-dom";
export default function FormularioDeUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => {
    alert("fred");
    verificarContrasenias(data);
  };
  const [probar, setProbar] = useState({ show: false, message: "" });
  function verificarContrasenias(data) {
    var p1 = document.getElementById("contraseniaid1").value;
    var p2 = document.getElementById("confirmContrasenia").value;
    console.log(p1);
    console.log(p2);
    if (p1 !== p2) {
      setProbar({ show: true, message: "Contraseñas no concuerdan" });
    } else {
      setProbar({ show: false, message: "" });
      createUser(data);
    }
  }
  return (
    <div>
      <Card className="Prueba" sx={{ minWidth: 275 }}>
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
            <h1>Alta de usuario</h1>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <FormControl sx={{ width: 80, mt: 1, ml: 1, mr: 0 }}>
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
                  >
                    <MenuItem value={"DNI"}>DNI</MenuItem>
                    <MenuItem value={"Libreta de enrolamiento LE"}>
                      LE Libreta de enrolamiento
                    </MenuItem>
                    <MenuItem value={"Libreta cívica LC"}>
                      LC Libreta cívica
                    </MenuItem>
                  </Select>
                </FormControl>
                <TextField
                  id="numDocid"
                  type="text"
                  style={{ width: 143 }}
                  label="Numero documento"
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
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                />
              </Grid>
              <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
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
                      control={<Checkbox />}
                      label="Laboratorio"
                      value="laboratorio"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Recepción"
                      value="recepcion"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Secretaria"
                      value="secretaria"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Director"
                      value="director"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={<Checkbox />}
                      label="Admin"
                      value="admin"
                      {...register("roles")}
                    />
                  </Grid>
                  <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                    <FormControlLabel
                      control={<Checkbox />}
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
                  Crear
                </Button>
                <Button
                  type="button"
                  variant="contained"
                  color="error"
                  component={Link}
                  to="/MostrarUsuarios"
                >
                  Cancelar
                </Button>
              </Grid>
            </Grid>
          </Box>
        </FormControl>
      </Card>
    </div>
  );
}
