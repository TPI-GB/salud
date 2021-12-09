import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormControlLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { createUser } from "../../services";
import React, { useState } from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";
import Button from "@mui/material/Button";
import Card from "@mui/material/Card";
import "./FormularioUsuario.scss";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";

export default function FormularioDeUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => verificarContrasenias(data);
  const [probar, setProbar] = useState({ show: false, message: "" });

  function verificarContrasenias(data) {
    var p1 = document.getElementById("contraseniaid1").value;
    var p2 = document.getElementById("confirmContrasenia").value;
    console.log(p1);
    console.log(p2);

    if (p1 != p2) {
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
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h1>Alta de usuario</h1>

            <div className="Contenedor">
              <div className="row">
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
                  className="Box"
                  id="numDocid"
                  type="text"
                  style={{ width: 143 }}
                  //inputProps={{ pattern: "^[1-9]{1}[0-9]{6,7}$" }}
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
              </div>
            </div>
            <div>
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
            </div>

            <div>
              <TextField
                id="confirmContrasenia"
                type="password"
                label="Confirmar contraseña"
                error={probar.show}
                helperText={probar.message}
              />

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
            </div>
            <Stack textAlign="center">
              Roles:
              <FormGroup className="Prueba">
                <div>
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
                </div>
                <div>
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
              </FormGroup>
            </Stack>
            <Button
              className="Boton"
              onClick={handleSubmit(onSubmit)}
              variant="contained"
              color="success"
            >
              Enviar
            </Button>
          </Box>
        </FormControl>
      </Card>
    </div>
  );
}
