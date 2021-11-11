import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import { FormControlLabel, Grid } from "@mui/material";
import FormGroup from "@mui/material/FormGroup";
import Checkbox from "@mui/material/Checkbox";
import { updateUser } from "../../services";

import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import FormControl from "@mui/material/FormControl";

import Button from "@mui/material/Button";

//probando card
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";

const bull = (
  <Box
    component="span"
    sx={{ display: "inline-block", mx: "2px", transform: "scale(0.8)" }}
  >
    •
  </Box>
);

export default function FormularioDeUsuario() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => updateUser(data);

  return (
    <FormControl onSubmit={handleSubmit(onSubmit)}>
      <Box sx={{ flexGrow: 1 }}>
        <Grid container spacing={3}>
          <Grid item xl={3}></Grid>
          <Grid item xl={6}>
            <h1>Alta de usuario</h1>
            <Grid
              container
              justifyContent="center"
              alignItems="center"
              spacing={2}
              direction="column"
            >
              <Grid item xs={4} sm={12} md={6} lg={4}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Nombre"
                  {...register("nombre")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6}>
                <TextField
                  id="outlined-basic"
                  type="text"
                  label="Apellido"
                  {...register("apellido")}
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  id="outlined-basic"
                  type="password"
                  pattern=".{6}"
                  label="Password"
                  {...register("password")}
                  required
                />
              </Grid>
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  id="outlined-basic"
                  type="email"
                  label="Mail"
                  {...register("email")}
                  required
                />
              </Grid>
              <TextField
                id="outlined-basic"
                type="text"
                label="Tipo documento"
                {...register("tipodocumento")}
                required
              />
              <Grid item xs={12} sm={12} md={6} lg={4}>
                <TextField
                  id="outlined-basic"
                  type="number"
                  label="Numero documento"
                  {...register("numerodocumento")}
                />
              </Grid>
              <Stack>
                Roles:
                <FormGroup>
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
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Admin"
                    value="Admin"
                    {...register("roles")}
                  />
                  <FormControlLabel
                    control={<Checkbox />}
                    label="Director"
                    value="Director"
                    {...register("roles")}
                  />
                </FormGroup>
              </Stack>
              <Button onClick={handleSubmit(onSubmit)}>Enviar</Button>
            </Grid>
          </Grid>
          <Grid item xl></Grid>
        </Grid>
      </Box>
    </FormControl>
  );
}
