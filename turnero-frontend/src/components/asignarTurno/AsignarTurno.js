import * as React from 'react';
import { useForm } from "react-hook-form";
import { useState } from "react";
import {
    Button,
    Modal,
    Box,
    TextField,
    Typography,
    Stack
  } from "@mui/material";
import { AsignarTurno, GetTurnoById } from "../../services/turno-service";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function BasicModal(turno) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const { register, handleSubmit } = useForm();
  const [state, setState] = useState(turno);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await GetTurnoById("62921f511827081c21132b65"); //Poner el id, traerlo de algun lado
    setTotal(response.lenght);
    setAllPlaces(
      response.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setPlaces(response.slice(0, 9));
  };

  const onSubmit = async (data) => {
    const newPaciente = { nombre: data.nombre, apellido: data.apellido, telefono: data.telefono, dni: data.dni, obraSocial: data.obraSocial};
    let dataPacienteToTurno = {};
    dataPacienteToTurno.place = state;
    dataPacienteToTurno.comment = newPaciente;
    const response = await AsignarTurno(dataPacienteToTurno)
    setState(response.data);
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
      <Button onClick={handleOpen}>Asignar</Button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Asignar Turno
          </Typography>
          <Stack direction="row" ml={2} mt={2}>
          <TextField
            style={{ background: "white" }}
            required
            {...register("nombre")}
            label="Nombre"
            />
            </Stack>

            <Stack direction="row" ml={2} mt={2}>
           <TextField
            style={{ background: "white" }}
            required
            {...register("apellido")}
            label="Apellido"
            />
            </Stack>

            <Stack direction="row" ml={2} mt={2}>
           <TextField
            style={{ background: "white" }}
            required
            {...register("obraSocial")}
            label="Obra social"
            /> 
            </Stack>

            <Stack direction="row" ml={2} mt={2}>
            <TextField
            style={{ background: "white" }}
            required
            {...register("dni")}
            label="DNI"
            />     
            </Stack>

            <Stack direction="row" ml={2} mt={2}>
            <TextField
            style={{ background: "white" }}
            required
            {...register("telefono")}
            label="Numero de telefono"
            />     
            </Stack>

            <Stack direction="row" ml={2} mt={2}>
            <Button>Asignar</Button>
            </Stack>
        </Box>
        
      </Modal>
      </form>
    </div>
  );
}