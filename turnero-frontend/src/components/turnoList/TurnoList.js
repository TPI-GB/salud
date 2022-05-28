import React, { useState, useEffect } from "react";
import { List, Pagination } from "antd";
import { Stack, Button } from "@mui/material";
import CssBaseline from "@mui/material/CssBaseline";
import Container from "@mui/material/Container";
import AddBoxIcon from "@mui/icons-material/AddBox";
import { GetTurnos } from "../../services/turno-service";
import "./TurnoList.scss";
import "antd/dist/antd.min.css";
import Search from "antd/lib/transfer/search";

export default function TurnoList() {
  const [turnos, setTurnos] = useState([]);
  const [allTurnos, setAllTurnos] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);

  useEffect(() => {
    getData();
  }, []);

  const getData = async () => {
    const response = await GetTurnos();
    setTotal(response.length);
    setAllTurnos(
      response.sort(function (a, b) {
        if (a.name > b.name) {
          return 1;
        } else {
          return -1;
        }
      })
    );
    setTurnos(response.slice(0, 10));
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

  //const buscar = (turnos) => {
  //  setTurnos(turnos)
  //}
  //<Search turnos={buscar}></Search>;

  return (
    <React.Fragment>
      <CssBaseline />
      <Container maxWidth="l">
        <div className="TurnoList">
          <h2>TURNOS</h2>
          <Search />
          <Stack
            direction="row"
            ml={10}
            mr={10}
            mb={0.1}
            mt={0.1}
            justifyContent="right"
            alignItems="flex"
          >
            <h3>Médico: </h3>
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
            <h3>Fecha: </h3>
          </Stack>
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
              </List.Item>
            )}
          />
          <List
            style={{ background: "#747f8a99" }}
            dataSource={turnos}
            bordered="true"
            renderItem={(turno) => (
              <List.Item>
                <List.Item.Meta title={<h4>{turno.lugar}</h4>}></List.Item.Meta>
                <List.Item.Meta title={<h4>{turno.hora}</h4>}></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{turno.paciente}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h4>{turno.disponible}</h4>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h3>{AnularTurnoBoton()}</h3>}
                ></List.Item.Meta>
                <List.Item.Meta
                  title={<h3>{CargarTurnoBoton()}</h3>}
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

function CargarTurno() {
  return;
}

function CargarTurnoBoton() {
  let button = (
    <Button
      size="small"
      variant="contained"
      style={{ background: "green" }}
      onClick={() => CargarTurno()}
    >
      <div style={{ marginRight: 8 }}>Asignar</div>
      <AddBoxIcon />
    </Button>
  );
  return button;
}

function AnularTurno() {
  return;
}

function AnularTurnoBoton() {
  let button = (
    <Button
      size="small"
      variant="contained"
      style={{ background: "#AC0D0D" }}
      onClick={() => AnularTurno()}
    >
      <div style={{ marginRight: 8 }}>Anular</div>
      <AddBoxIcon />
    </Button>
  );
  return button;
}
