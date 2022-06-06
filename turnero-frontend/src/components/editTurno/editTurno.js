import {
  CardContent,
  Card,
  Stack,
  TextField,
  Grid,
  Button,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { EditarTurnoRequest } from "../../services/turno-service";
import { useForm } from "react-hook-form";

export default function EditarTurno() {
  const { id } = useParams();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data) => {
    let dataRequest = {};
    dataRequest.id = id;
    dataRequest.paciente = data.paciente;
    await EditarTurnoRequest(dataRequest);
  };

  return (
    <Stack direction="row" ml={2} mt={3}>
      <Grid item xs={4} style={{ textAlign: "center" }}>
        <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
          <CardContent>
            <h1>Editar Turno</h1>

            <form onSubmit={handleSubmit(onSubmit)}>
              <Stack direction="row" ml={2}>
                <TextField
                  style={{ background: "white" }}
                  {...register("paciente")}
                  label="Paciente"
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Stack>
              <Stack direction="row" ml={2} mt={2}>
                <Button
                  type="submit"
                  variant="contained"
                  style={{ background: "#39A2DB" }}
                >
                  Guardar Cambios
                </Button>
              </Stack>
            </form>
          </CardContent>
        </Card>
      </Grid>
    </Stack>
  );
}
