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
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  GetTurnos,
  GetTurnosFilter,
  AnularTurnoRequest,
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

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    let data = {};
    data.medico = medico;
    data.fecha = date;
    const turnos = await GetTurnosFilter(data);
    setAllTurnos(
      turnos.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setTurnos(turnos.slice(0, 10));
    setTotal(turnos.length);
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await GetTurnos();
    const medicos = Array.from(new Set(response)).map((t) => t.medico);
    setMedicos([...new Set(medicos)]);
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
    if (turno.disponible) {
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
                  title={<h4>{turno.paciente}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={
                    <h4>
                      <b>{renderDisponible(turno)}</b>
                    </h4>
                  }
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{AnularTurnoBoton(turno)}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{LiberarTurnoBoton(turno)}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{EditarTurnoBoton(turno)}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{AsignarTurnoBoton(turno)}</h4>}
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

async function AnularTurno(turno) {
  let data = {};
  data.id = turno._id;
  await AnularTurnoRequest(data);
}

function AnularTurnoBoton(turno) {
  let button;
  if (turno.anulado) {
    button = (
      <Button
        size="small"
        variant="contained"
        disabled
        style={{ background: "#AC0D0D" }}
        onClick={() => AnularTurno(turno)}
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
        onClick={() => AnularTurno(turno)}
      >
        <div style={{ marginRight: 8 }}>Anular</div>
        <DoDisturbAltTwoToneIcon />
      </Button>
    );
  }
  return button;
}

function LiberarTurno() {
  return;
}

function LiberarTurnoBoton(turno) {
  let button;
  if (turno.disponible || turno.anulado) {
    button = (
      <Button
        size="small"
        disabled
        variant="contained"
        style={{ background: "#D68910" }}
        onClick={() => LiberarTurno()}
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
        onClick={() => LiberarTurno()}
      >
        <div style={{ marginRight: 8 }}>Liberar</div>
        <PanToolOutlinedIcon />
      </Button>
    );
  }
  return button;
}

function EditarTurno(turno) {
  console.log(turno);
}

function EditarTurnoBoton(turno) {
  let button;
  if (turno.anulado || turno.disponible) {
    button = (
      <Button
        size="small"
        variant="contained"
        disabled
        style={{ background: "blue" }}
        onClick={() => EditarTurno()}
      >
        <div style={{ marginRight: 8 }}>Editar</div>
        <EditTwoToneIcon />
      </Button>
    );
  } else {
    button = (
      <Button
        size="small"
        variant="contained"
        style={{ background: "blue" }}
        onClick={() => EditarTurno()}
      >
        <div style={{ marginRight: 8 }}>Editar</div>
        <EditTwoToneIcon />
      </Button>
    );
  }
  return button;
}

function AsignarTurno() {
  return;
}

function AsignarTurnoBoton(turno) {
  let button;
  if (!turno.disponible || turno.anulado) {
    button = (
      <Button
        size="small"
        disabled
        variant="contained"
        style={{ background: "green" }}
        onClick={() => AsignarTurno()}
      >
        <div style={{ marginRight: 8 }}>Asignar</div>
        <AssignmentTurnedInIcon />
      </Button>
    );
  } else {
    button = (
      <Button
        size="small"
        variant="contained"
        style={{ background: "green" }}
        onClick={() => AsignarTurno()}
      >
        <div style={{ marginRight: 8 }}>Asignar</div>
        <AssignmentTurnedInIcon />
      </Button>
    );
  }
  return button;
}
