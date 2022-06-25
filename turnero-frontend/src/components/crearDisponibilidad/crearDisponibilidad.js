import React from "react";
import { useForm } from "react-hook-form";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import {
  Button,
  Stack,
  Grid,
  Card,
  CardContent,
  TextField,
  Select,
  MenuItem,
} from "@mui/material";
import "./crearDisponibilidad.scss";
import { CrearDisponibilidadRequest } from "../../services/turno-service";

export default function CrearDisponibilidad() {
  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    CrearDisponibilidadRequest(data);
  };

  const hours = [];
  const minutes = [];

  for (let i = 0; i <= 23; i++) {
    hours.push(<MenuItem value={i}>{i}</MenuItem>);
  }
  for (let i = 0; i <= 60; i++) {
    minutes.push(<MenuItem value={i}>{i}</MenuItem>);
  }

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={4} style={{ textAlign: "center" }}>
          <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
            <CardContent>
              <h1>Nueva Disponibilidad</h1>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Stack direction="row" justifyContent="center" ml={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("user")}
                    label="Nombre"
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("lugar")}
                    label="Lugar"
                  />
                </Stack>
                <Stack direction="row" justifyContent="center" ml={2} mt={2}>
                  <Stack ml={2}>
                    <p>Hora Inicial</p>
                    <Select {...register("horaInicio")} required>
                      {hours}
                    </Select>
                  </Stack>
                  <Stack ml={2}>
                    <p>Minuto Inicial</p>
                    <Select {...register("minutoInicio")} required>
                      {minutes}
                    </Select>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" ml={2} mt={2}>
                  <Stack ml={2}>
                    <p>Hora Final</p>
                    <Select {...register("horaFin")} required>
                      {hours}
                    </Select>
                  </Stack>
                  <Stack ml={2}>
                    <p>Minuto Final</p>
                    <Select {...register("minutoFin")} required>
                      {minutes}
                    </Select>
                  </Stack>
                </Stack>
                <Stack direction="row" justifyContent="center" ml={2} mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    required
                    {...register("duracion")}
                    label="Duracion en minutos"
                  />
                </Stack>
                <Stack justifyContent="center" ml={2} mt={2}>
                  <p>Seleccione Dia</p>
                  <Select
                    {...register("diaDeSemana")}
                    required
                    placeholder="Dia"
                  >
                    <MenuItem value={1}>{"Lunes"}</MenuItem>
                    <MenuItem value={2}>{"Martes"}</MenuItem>
                    <MenuItem value={3}>{"Miercoles"}</MenuItem>
                    <MenuItem value={4}>{"Jueves"}</MenuItem>
                    <MenuItem value={5}>{"Viernes"}</MenuItem>
                    <MenuItem value={6}>{"Sabado"}</MenuItem>
                    <MenuItem value={0}>{"Domingo"}</MenuItem>
                  </Select>
                </Stack>
                <Stack direction="row" justifyContent="center" ml={2} mt={2}>
                  <Button
                    variant="contained"
                    type="submit"
                    style={{ background: "#39A2DB" }}
                  >
                    <CheckCircleTwoToneIcon /> Guardar Disponibilidad
                  </Button>
                </Stack>
              </form>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Stack>
  );
}
