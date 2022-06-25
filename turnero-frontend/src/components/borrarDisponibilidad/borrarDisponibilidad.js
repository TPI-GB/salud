import { List } from "antd";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import "./borrarDisponibilidad.scss";
import "antd/dist/antd.min.css";
import { InputLabel, MenuItem, Select, Stack, Button } from "@mui/material";
import React, { useState, useEffect } from "react";
import {
  GetTurnos,
  GetDisponibilidadByUser,
  BorrarDisponibilidadRequest,
  BorrarUserDisponibilidadRequest,
} from "../../services/turno-service";
import SearchIcon from "@mui/icons-material/Search";
import { useForm } from "react-hook-form";

export default function BorrarDisponibilidad() {
  const [disponibilidades, setDisponibilidades] = useState([]);
  const [user, setUser] = useState("");
  const [users, setUsers] = useState([]);

  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    if (user != null) {
      const response = await GetDisponibilidadByUser(user);
      setDisponibilidades(response.disponibilidades);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await GetTurnos();
    const users = Array.from(new Set(response)).map((t) => t.medico);
    setUsers([...new Set(users)]);
  };

  const handleChangeUser = (event) => {
    const {
      target: { value },
    } = event;
    setUser(value);
  };

  const renderHora = (hora, minuto) => {
    let minutoRender = "";
    if (minuto < 10) {
      minutoRender = "0" + minuto;
    } else {
      minutoRender = minuto;
    }
    return hora + ":" + minutoRender;
  };

  const renderDia = (dia) => {
    if (dia === 0) {
      return "Domingo";
    } else if (dia === 1) {
      return "Lunes";
    } else if (dia === 2) {
      return "Martes";
    } else if (dia === 3) {
      return "Miercoles";
    } else if (dia === 4) {
      return "Jueves";
    } else if (dia === 5) {
      return "Viernes";
    } else if (dia === 6) {
      return "Sabado";
    }
  };

  const Borrar = async (disponibilidad) => {
    let data = {};
    data.disponibilidad = disponibilidad;
    data.user = user;
    await BorrarDisponibilidadRequest(data);
    onSubmit();
  };

  const BorrarUsuario = async () => {
    if (user !== null && user !== "") {
      let data = {};
      data.user = user;
      await BorrarUserDisponibilidadRequest(data);
      window.location = window.location.href;
    }
  };

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="l">
        <div className="borrarTurno">
          <form onSubmit={handleSubmit(onSubmit)}>
            <h2>DISPONIBILIDADES</h2>
            <Stack>
              <div className="estilosDeSelect">
                <InputLabel id="medico-multiple-checkbox-label"></InputLabel>
                <InputLabel id="medico-label">Usuario</InputLabel>
                <Select
                  labelId="usuario-label"
                  label="Usuario"
                  value={user}
                  onChange={handleChangeUser}
                >
                  {users.map((m) => (
                    <MenuItem value={m}>{`${m}`}</MenuItem>
                  ))}
                </Select>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ background: "#39A2DB" }}
                  sx={{ mt: 4, ml: 2, mr: 2, mb: 4 }}
                >
                  <SearchIcon />
                </Button>
                <Button
                  variant="contained"
                  type="submit"
                  style={{ background: "#f44336" }}
                  sx={{ mt: 4, ml: 2, mr: 2, mb: 4 }}
                  onClick={() => BorrarUsuario()}
                >
                  BORRAR TODAS
                </Button>
              </div>
            </Stack>
            <List
              size="small"
              style={{ background: "#485d887d" }}
              dataSource={["this data is to show a single column"]}
              bordered="true"
              renderItem={() => (
                <List.Item>
                  <List.Item.Meta title={<h3>Lugar</h3>}></List.Item.Meta>
                  <List.Item.Meta title={<h3>Dia</h3>}></List.Item.Meta>
                  <List.Item.Meta title={<h3>Inicio</h3>}></List.Item.Meta>
                  <List.Item.Meta title={<h3>Fin</h3>}></List.Item.Meta>
                  <List.Item.Meta title={""}></List.Item.Meta>
                </List.Item>
              )}
            />
            <List
              size="small"
              style={{ background: "#747f8a99" }}
              dataSource={disponibilidades}
              bordered="true"
              renderItem={(disponibilidad) => (
                <List.Item>
                  <List.Item.Meta
                    title={<h4>{disponibilidad.lugar}</h4>}
                  ></List.Item.Meta>
                  <List.Item.Meta
                    title={<h4>{renderDia(disponibilidad.diaDeSemana)}</h4>}
                  ></List.Item.Meta>
                  <List.Item.Meta
                    title={
                      <h4>
                        {renderHora(
                          disponibilidad.horaInicio,
                          disponibilidad.minutoInicio
                        )}
                      </h4>
                    }
                  ></List.Item.Meta>
                  <List.Item.Meta
                    title={
                      <h4>
                        {renderHora(
                          disponibilidad.horaFin,
                          disponibilidad.minutoFin
                        )}
                      </h4>
                    }
                  ></List.Item.Meta>
                  <List.Item.Meta
                    title={
                      <Button
                        variant="contained"
                        type="submit"
                        style={{ background: "#f44336" }}
                        sx={{ mt: 1, ml: 2, mr: 2, mb: 4 }}
                        onClick={() => Borrar(disponibilidad)}
                      >
                        BORRAR
                      </Button>
                    }
                  ></List.Item.Meta>
                </List.Item>
              )}
            />
          </form>
        </div>
      </Container>
    </React.Fragment>
  );
}
