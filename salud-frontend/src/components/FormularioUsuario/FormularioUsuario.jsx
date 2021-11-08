import React from "react";
import { useForm } from "react-hook-form";
import Stack from "@mui/material/Stack";
import Grid from "@mui/material/Grid";
import { updateUser } from "../../services";

export default function FormularioDeUsuario() {
  const { register, handleSubmit } = useForm();
  const onSubmit = (data) => updateUser(data);

  return (
    <div>
      <h1>Alta de usuario</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input type="text" placeholder="Nombre" {...register("nombre")} />
        <input type="text" placeholder="Apellido" {...register("apellido")} />
        <input
          type="password"
          pattern=".{6,}"
          placeholder="Contrasenia"
          {...register("contrasenia")}
          required
        />
        <input
          type="email"
          placeholder="Mail"
          {...register("email")}
          required
        />
        <input
          type="text"
          placeholder="Tipo documento"
          {...register("tipodocumento")}
          required
        />
        <input
          type="number"
          placeholder="Numero documento"
          {...register("numerodocumento")}
          required
        />
        <Grid md={3} lg={2} spacing={2}>
          <Grid
            item
            xs={3}
            direction="row"
            justifyContent="center"
            alignItems="flex-start"
          ></Grid>
          <Grid item xs={2}>
            <label for="rol">
              Rol:
              <Stack direction="row" spacing={2}>
                <input
                  type="checkbox"
                  {...register("recepcion")}
                  value="Recepcion"
                />
                <label for="recepcion"> Recepcion</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <input
                  type="checkbox"
                  {...register("laboratorio")}
                  value="Laboratorio"
                />
                <label for="laboratorio"> Laboratorio</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <input
                  type="checkbox"
                  {...register("secretaria")}
                  value="Secretaria"
                />
                <label for="secretaria"> Secretaria</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <input type="checkbox" {...register("medico")} value="Medico" />
                <label for="medico"> Medico</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <input type="checkbox" {...register("admin")} value="Admin" />
                <label for="admin"> Admin</label>
              </Stack>
              <Stack direction="row" spacing={2}>
                <input
                  type="checkbox"
                  {...register("director")}
                  value="Director"
                />
                <label for="director"> Director</label>
              </Stack>
            </label>
          </Grid>
        </Grid>
        <input type="submit" />
      </form>
    </div>
  );
}
