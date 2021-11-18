import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormControlLabel } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { createUser } from "../../services";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";

//probando card
import Card from "@mui/material/Card";
import "./FormularioUsuario.scss";

//import { ValidatorForm, TextValidator } from "react-material-ui-form-validator";

export default function FormularioDeUsuario() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = (data) => createUser(data);

  return (
    <div>
      <Card className="Prueba" sx={{ minWidth: 275 }}>
        <FormControl className="Prueba" onSubmit={handleSubmit(onSubmit)}>
          <Box
            component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <h1>Alta de usuario</h1>

            <div>
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
                id="contraseniaid"
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
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />

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
            </div>

            <div>
              <TextField
                id="tipodocid"
                type="text"
                label="Tipo documento"
                {...register("tipodocumento", {
                  required: {
                    value: true,
                    message: "Necesitas este campo",
                  },
                })}
                error={Boolean(errors.tipodocumento)}
                helperText={errors.tipodocumento?.message}
              />

              <TextField
                id="numDocid"
                type="text"
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
            <Stack className="Prueba">
              Roles:
              <FormGroup className="Prueba">
                <div>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Laboratorio"
                    value="Laboratorio"
                    {...register("roles")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Recepcion"
                    value="Recepcion"
                    {...register("roles")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Secretaria"
                    value="Secretaria"
                    {...register("roles")}
                  />
                </div>
                <div>
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Director"
                    value="Director"
                    {...register("roles")}
                  />

                  <FormControlLabel
                    control={<Checkbox />}
                    label="Admin"
                    value="Admin"
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
