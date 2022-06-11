import { List, Pagination } from "antd";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AssignmentTurnedInIcon from "@mui/icons-material/AssignmentTurnedIn";
import PanToolOutlinedIcon from "@mui/icons-material/PanToolOutlined";
import DoDisturbAltTwoToneIcon from "@mui/icons-material/DoDisturbAltTwoTone";
import EditTwoToneIcon from "@mui/icons-material/EditTwoTone";
import "./TurnoList.scss";
import "antd/dist/antd.min.css";
import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
  Stack,
  Box,
  Modal,
  Grid,
  Card,
  CardContent,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import CheckCircleTwoToneIcon from "@mui/icons-material/CheckCircleTwoTone";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  GetTurnos,
  GetTurnosFilter,
  AnularTurnoRequest,
  LiberarTurnoRequest,
  EditarTurnoRequest,
  AsignarTurno,
} from "../../services/turno-service";

export default function TurnoList() {
  const [date, setDate] = useState("");
  const [dateRender, setDateRender] = useState("");
  const [turnos, setTurnos] = useState([]);
  const [allTurnos, setAllTurnos] = useState([]);
  const [medico, setMedico] = useState("");
  const [medicos, setMedicos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [open, setOpen] = useState(false);
  const [pacienteNombre, setPacienteNombre] = useState("");
  const [pacienteApellido, setPacienteApellido] = useState("");
  const [pacienteObraSocial, setPacienteObraSocial] = useState("");
  const [pacienteDni, setPacienteDni] = useState("");
  const [pacienteTelefono, setPacienteTelefono] = useState("");
  const [turnoAsignar, setTurnoAsignar] = useState("");

  const [turnoEdit, setTurnoEdit] = useState(null);
  const [openEdit, setOpenEdit] = useState(false);
  const [pacienteEditNombre, setPacienteEditNombre] = useState("");
  const [pacienteEditApellido, setPacienteEditApellido] = useState("");
  const [pacienteEditObraSocial, setPacienteEditObraSocial] = useState("");
  const [pacienteEditDni, setPacienteEditDni] = useState("");
  const [pacienteEditTelefono, setPacienteEditTelefono] = useState("");

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    let data = {};
    data.medico = medico;
    data.fecha = date;
    const turnos = await GetTurnosFilter(data);
    setAllTurnos(
      turnos.sort(function (a, b) {
        if (a.horaInicio > b.horaInicio) {
          return 1;
        } else if (b.horaInicio > a.horaInicio) {
          return -1;
        } else {
          if (a.minutoInicio > b.minutoInicio) {
            return 1;
          } else {
            return -1;
          }
        }
      })
    );
    setTurnos(turnos.slice(0, 10));
    setTotal(turnos.length);
  };

  const changeOpen = (turno) => {
    setTurnoAsignar(turno);
    setOpen(true);
  };

  const changeClose = () => {
    setOpen(false);
    setPacienteNombre("");
    setPacienteApellido("");
    setPacienteDni("");
    setPacienteObraSocial("");
    setPacienteTelefono("");
  };

  const changeOpenEdit = (turno) => {
    setTurnoEdit(turno);
    setPacienteEditNombre(turno.paciente.nombre);
    setPacienteEditApellido(turno.paciente.apellido);
    setPacienteEditDni(turno.paciente.dni);
    setPacienteEditObraSocial(turno.paciente.obraSocial);
    setPacienteEditTelefono(turno.paciente.telefono);
    setOpenEdit(true);
  };

  const changeCloseEdit = () => {
    setOpenEdit(false);
    setPacienteEditNombre("");
    setPacienteEditApellido("");
    setPacienteEditDni("");
    setPacienteEditObraSocial("");
    setPacienteEditTelefono("");
  };

  const changePaciente = async () => {
    let data = {};
    data.id = turnoAsignar._id;
    data.pacienteNombre = pacienteNombre;
    data.pacienteApellido = pacienteApellido;
    data.pacienteObraSocial = pacienteObraSocial;
    data.pacienteDni = pacienteDni;
    data.pacienteTelefono = pacienteTelefono;
    await AsignarTurno(data);
    changeClose();
    onSubmit();
  };

  const changePacienteEdit = async () => {
    let data = {};
    let paciente = {};
    paciente.nombre = pacienteEditNombre;
    paciente.apellido = pacienteEditApellido;
    paciente.dni = pacienteEditDni;
    paciente.obraSocial = pacienteEditObraSocial;
    paciente.telefono = pacienteEditTelefono;
    data.id = turnoEdit._id;
    data.paciente = paciente;
    await EditarTurnoRequest(data);
    changeCloseEdit();
    setPacienteEditNombre("");
    setPacienteEditApellido("");
    setPacienteEditDni("");
    setPacienteEditObraSocial("");
    setPacienteEditTelefono("");
    onSubmit();
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await GetTurnos();
    const medicos = Array.from(new Set(response)).map((t) => t.medico);
    setMedicos([...new Set(medicos)]);
  };

  const handleChangePacienteEditNombre = (e) => {
    setPacienteEditNombre(e.target.value);
  };
  const handleChangePacienteEditApellido = (e) => {
    setPacienteEditApellido(e.target.value);
  };
  const handleChangePacienteEditDni = (e) => {
    setPacienteEditDni(e.target.value);
  };
  const handleChangePacienteEditObraSocial = (e) => {
    setPacienteEditObraSocial(e.target.value);
  };
  const handleChangePacienteEditTelefono = (e) => {
    setPacienteEditTelefono(e.target.value);
  };

  const handleChangePacienteNombre = (e) => {
    setPacienteNombre(e.target.value);
  };

  const handleChangePacienteApellido = (e) => {
    setPacienteApellido(e.target.value);
  };

  const handleChangePacienteObraSocial = (e) => {
    setPacienteObraSocial(e.target.value);
  };

  const handleChangePacienteDni = (e) => {
    setPacienteDni(e.target.value);
  };

  const handleChangePacienteTelefono = (e) => {
    setPacienteTelefono(e.target.value);
  };

  const handleChange = (event) => {
    if (event > 1) {
      setPage(event);
      setTurnos(allTurnos.slice((event - 1) * 10, (event - 1) * 10 + 11));
    } else {
      setPage(1);
      setTurnos(allTurnos.slice(0, 10));
    }
  };

  const handleChangeMedico = (event) => {
    const {
      target: { value },
    } = event;
    setMedico(value);
  };

  const renderHora = (turno) => {
    if (turno.minutoInicio === 0) {
      return `${turno.horaInicio}:00`;
    } else {
      return `${turno.horaInicio}:${turno.minutoInicio}`;
    }
  };

  const renderDisponible = (turno) => {
    if (turno.anulado) {
      return "ANULADO";
    } else if (turno.disponible) {
      return "SI";
    } else {
      return "NO";
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="l">
        <div className="TurnoList">
          <h2>TURNOS</h2>
          <Stack
            direction="row"
            ml={10}
            mr={10}
            mb={0.1}
            mt={0.1}
            justifyContent="right"
            alignItems="flex"
          >
            <h3>Médico: {medico}</h3>
          </Stack>
          <Stack
            direction="row"
            ml={10}
            mr={10}
            mb={0.1}
            mt={0.1}
            justifyContent="right"
            alignItems="flex"
          >
            <h3>Fecha: {dateRender}</h3>
          </Stack>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div className="estilosDeSelect">
              <FormControl sx={{ ml: 2, mr: 2, width: 250 }}>
                <InputLabel id="medico-multiple-checkbox-label"></InputLabel>
                <InputLabel id="medico-label">Medico</InputLabel>
                <Select
                  labelId="medico-label"
                  label="Medico"
                  value={medico}
                  onChange={handleChangeMedico}
                >
                  {medicos.map((m) => (
                    <MenuItem value={m}>{`${m}`}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <LocalizationProvider
                dateAdapter={AdapterDateFns}
                sx={{ ml: 2, mr: 2 }}
              >
                <DatePicker
                  label="Fecha"
                  value={date}
                  onChange={(date) => {
                    setDate(date);
                    setDateRender(
                      date.getDate() +
                        "/" +
                        (date.getMonth() + 1) +
                        "/" +
                        date.getFullYear()
                    );
                  }}
                  renderInput={(params) => <TextField {...params} />}
                />
              </LocalizationProvider>
              <Button
                variant="contained"
                type="submit"
                style={{ background: "#39A2DB" }}
                sx={{ mt: 1, ml: 2, mr: 2 }}
              >
                <SearchIcon />
              </Button>
            </div>
          </form>
          <List
            style={{ background: "#485d887d" }}
            dataSource={["this data is to show a single column"]}
            bordered="true"
            renderItem={() => (
              <List.Item>
                <List.Item.Meta title={<h3>Hora</h3>}></List.Item.Meta>
                <List.Item.Meta title={<h3>Lugar</h3>}></List.Item.Meta>
                <List.Item.Meta title={<h3>Paciente</h3>}></List.Item.Meta>
                <List.Item.Meta title={<h3>Disponible</h3>}></List.Item.Meta>
                <List.Item.Meta title={" "}></List.Item.Meta>
                <List.Item.Meta title={" "}></List.Item.Meta>
                <List.Item.Meta title={" "}></List.Item.Meta>
                <List.Item.Meta title={" "}></List.Item.Meta>
              </List.Item>
            )}
          />
          <List
            style={{ background: "#747f8a99" }}
            dataSource={turnos}
            bordered="true"
            renderItem={(turno) => (
              <List.Item>
                <List.Item.Meta
                  title={
                    <h3>
                      <b>{renderHora(turno)}</b>
                    </h3>
                  }
                ></List.Item.Meta>
                <List.Item.Meta title={<h4>{turno.lugar}</h4>}></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{turno.paciente.nombre}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={
                    <h4>
                      <b>{renderDisponible(turno)}</b>
                    </h4>
                  }
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{AnularTurnoBoton(turno, onSubmit)}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{LiberarTurnoBoton(turno, onSubmit)}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={
                    <h4>
                      {EditarTurnoBoton(
                        turno,
                        changeOpenEdit,
                        changeCloseEdit,
                        openEdit,
                        handleChangePacienteEditNombre,
                        handleChangePacienteEditApellido,
                        handleChangePacienteEditDni,
                        handleChangePacienteEditObraSocial,
                        handleChangePacienteEditTelefono,
                        pacienteEditNombre,
                        pacienteEditApellido,
                        pacienteEditDni,
                        pacienteEditObraSocial,
                        pacienteEditTelefono,
                        changePacienteEdit
                      )}
                    </h4>
                  }
                ></List.Item.Meta>
                <List.Item.Meta
                  title={
                    <h4>
                      {AsignarTurnoBoton(
                        turno,
                        changeOpen,
                        changeClose,
                        handleChangePacienteNombre,
                        handleChangePacienteApellido,
                        handleChangePacienteObraSocial,
                        handleChangePacienteDni,
                        handleChangePacienteTelefono,
                        open,
                        pacienteNombre,
                        pacienteApellido,
                        pacienteObraSocial,
                        pacienteDni,
                        pacienteTelefono,
                        changePaciente
                      )}
                    </h4>
                  }
                ></List.Item.Meta>
              </List.Item>
            )}
          />
          <Stack
            direction="row"
            mt={1}
            mb={1}
            justifyContent="Center"
            alignItems="flex"
          >
            <Pagination
              hideOnSinglePage={true}
              page={page}
              total={total}
              showTotal={(total) => `Total ${total} Turnos`}
              onChange={handleChange}
            />
          </Stack>
        </div>
      </Container>
    </React.Fragment>
  );
}

async function AnularTurno(turno, actualizar) {
  let data = {};
  data.id = turno._id;
  await AnularTurnoRequest(data);
  actualizar();
}

function AnularTurnoBoton(turno, actualizar) {
  let button;
  if (turno.anulado) {
    button = (
      <Button
        size="small"
        variant="contained"
        disabled
        style={{ background: "#AC0D0D" }}
        onClick={() => AnularTurno(turno, actualizar)}
      >
        <div style={{ marginRight: 8 }}>Anular</div>
        <DoDisturbAltTwoToneIcon />
      </Button>
    );
  } else {
    button = (
      <Button
        size="small"
        variant="contained"
        style={{ background: "#AC0D0D" }}
        onClick={() => AnularTurno(turno, actualizar)}
      >
        <div style={{ marginRight: 8 }}>Anular</div>
        <DoDisturbAltTwoToneIcon />
      </Button>
    );
  }
  return button;
}

async function LiberarTurno(turno, actualizar) {
  let data = {};
  data.id = turno._id;
  await LiberarTurnoRequest(data);
  actualizar();
}

function LiberarTurnoBoton(turno, actualizar) {
  let button;
  if (turno.disponible || turno.anulado) {
    button = (
      <Button
        size="small"
        disabled
        variant="contained"
        style={{ background: "#D68910" }}
        onClick={() => LiberarTurno(turno, actualizar)}
      >
        <div style={{ marginRight: 8 }}>Liberar</div>
        <PanToolOutlinedIcon />
      </Button>
    );
  } else {
    button = (
      <Button
        size="small"
        variant="contained"
        style={{ background: "#D68910" }}
        onClick={() => LiberarTurno(turno, actualizar)}
      >
        <div style={{ marginRight: 8 }}>Liberar</div>
        <PanToolOutlinedIcon />
      </Button>
    );
  }
  return button;
}

function EditarTurnoBoton(
  turno,
  changeOpenEdit,
  changeCloseEdit,
  openEdit,
  handleChangePacienteEditNombre,
  handleChangePacienteEditApellido,
  handleChangePacienteEditDni,
  handleChangePacienteEditObraSocial,
  handleChangePacienteEditTelefono,
  pacienteEditNombre,
  pacienteEditApellido,
  pacienteEditDni,
  pacienteEditObraSocial,
  pacienteEditTelefono,
  changePacienteEdit
) {
  const stylebox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "90%",
    width: 750,
    overflow: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  const getButton = () => {
    if (turno.anulado || turno.disponible) {
      return (
        <Button
          size="small"
          variant="contained"
          disabled
          style={{ background: "blue" }}
        >
          <div style={{ marginRight: 8 }} onClick={() => changeOpenEdit(turno)}>
            Editar
          </div>
          <EditTwoToneIcon />
        </Button>
      );
    } else {
      return (
        <Button size="small" variant="contained" style={{ background: "blue" }}>
          <div style={{ marginRight: 8 }} onClick={() => changeOpenEdit(turno)}>
            Editar
          </div>
          <EditTwoToneIcon />
        </Button>
      );
    }
  };
  return (
    <div>
      {getButton()}
      <Modal
        open={openEdit}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylebox}>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
              <CardContent>
                <h1>Editar Turno</h1>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteEditNombre}
                    value={pacienteEditNombre}
                    label={"Nuevo nombre de paciente"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteEditApellido}
                    value={pacienteEditApellido}
                    label={"Nuevo apellido de paciente"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteEditDni}
                    value={pacienteEditDni}
                    label={"Nuevo DNI de paciente"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteEditObraSocial}
                    value={pacienteEditObraSocial}
                    label={"Nueva obra social de paciente"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteEditTelefono}
                    value={pacienteEditTelefono}
                    label={"Nuevo telefono de paciente"}
                    InputLabelProps={{
                      shrink: true,
                    }}
                  />
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <Button
                    onClick={() => changePacienteEdit(turno)}
                    variant="contained"
                    style={{ background: "#39A2DB" }}
                  >
                    <CheckCircleTwoToneIcon /> Guardar Cambios
                  </Button>
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ background: "blue" }}
                  >
                    <div
                      style={{ marginRight: 8 }}
                      onClick={() => changeCloseEdit()}
                    >
                      Cerrar
                    </div>
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}

function AsignarTurnoBoton(
  turno,
  changeOpen,
  changeClose,
  handleChangePacienteNombre,
  handleChangePacienteApellido,
  handleChangePacienteObraSocial,
  handleChangePacienteDni,
  handleChangePacienteTelefono,
  open,
  pacienteNombre,
  pacienteApellido,
  pacienteObraSocial,
  pacienteDni,
  pacienteTelefono,
  changePaciente
) {
  console.log(turno);
  const stylebox = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    height: "90%",
    width: 750,
    overflow: "auto",
    bgcolor: "background.paper",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  const getButton = () => {
    if (!turno.disponible || turno.anulado) {
      return (
        <Button
          size="small"
          disabled
          variant="contained"
          style={{ background: "green" }}
        >
          <div style={{ marginRight: 8 }} onClick={() => changeOpen(turno)}>
            Asignar
          </div>
          <AssignmentTurnedInIcon />
        </Button>
      );
    } else {
      return (
        <Button
          size="small"
          variant="contained"
          style={{ background: "green" }}
        >
          <div style={{ marginRight: 8 }} onClick={() => changeOpen(turno)}>
            Asignar
          </div>
          <AssignmentTurnedInIcon />
        </Button>
      );
    }
  };
  return (
    <div>
      {getButton()}
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={stylebox}>
          <Grid item xs={4} style={{ textAlign: "center" }}>
            <Card style={{ background: "#E8F0F2" }} sx={{ minWidth: 400 }}>
              <CardContent>
                <h1>Asignar Turno</h1>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteNombre}
                    value={pacienteNombre}
                    label="Nombre"
                  />
                </Stack>

                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteApellido}
                    value={pacienteApellido}
                    label="Apellido"
                  />
                </Stack>

                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteObraSocial}
                    value={pacienteObraSocial}
                    label="Obra social"
                  />
                </Stack>

                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteDni}
                    value={pacienteDni}
                    label="DNI"
                  />
                </Stack>

                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <TextField
                    style={{ background: "white" }}
                    onChange={handleChangePacienteTelefono}
                    value={pacienteTelefono}
                    label="Numero de telefono"
                  />
                </Stack>

                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <Button
                    onClick={() => changePaciente(turno)}
                    variant="contained"
                    style={{ background: "#39A2DB" }}
                  >
                    <CheckCircleTwoToneIcon /> Asignar
                  </Button>
                </Stack>
                <Stack direction={"row"} justifyContent="center" mt={2}>
                  <Button
                    size="small"
                    variant="contained"
                    style={{ background: "blue" }}
                  >
                    <div
                      style={{ marginRight: 8 }}
                      onClick={() => changeClose()}
                    >
                      Cerrar
                    </div>
                  </Button>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        </Box>
      </Modal>
    </div>
  );
}
