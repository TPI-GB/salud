import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormControlLabel, Grid } from "@mui/material";
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
import CardContent from "@mui/material/CardContent";
import "./FormularioUsuario.scss";
export default function FormularioDeUsuario() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => createUser(data);

  return (
    <div>
      <Card sx={{ minWidth: 275 }}>
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
                id="outlined-basic"
                type="text"
                label="Nombre"
                {...register("nombre")}
              />

              <TextField
                id="outlined-basic"
                type="text"
                label="Apellido"
                {...register("apellido")}
              />
            </div>
            <div>
              <TextField
                id="outlined-basic"
                type="password"
                pattern=".{6}"
                label="Password"
                {...register("password")}
                required
              />

              <TextField
                id="outlined-basic"
                type="email"
                label="Mail"
                {...register("email")}
                required
              />
            </div>

            <div>
              <TextField
                id="outlined-basic"
                type="text"
                label="Tipo documento"
                {...register("tipodocumento")}
                required
              />

              <TextField
                id="outlined-basic"
                type="number"
                label="Numero documento"
                {...register("numerodocumento")}
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
              className="Prueba"
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
