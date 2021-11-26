import React, { useState, useEffect } from "react";
import { getMedicalHistoryById } from "../../services/medical-history-service";
import { useParams } from "react-router";
import { Box, TextField, Grid, Select, MenuItem } from "@mui/material";
import "./MedicalHistoryForm.scss";

export default function MedicalHistory() {
  const [info, setInfo] = useState({
    numeroHistoriaClinica: "",
    tipoDocumento: "",
    numeroDocumento: "",
    nombres: "",
    apellidos: "",
    nacionalidad: "",
    sexo: "",
    edad: "",
    ocupacionActual: "",
    estadoCivil: "",
    domicilioActual: "",
    raza: "",
  });

  const { id } = useParams();

  useEffect(() => {
    const getData = async () => {
      const response = await getMedicalHistoryById(id);
      setInfo(response.data);
    };
    if (id) {
      getData();
    }
  }, []);

  return (
    <Box component="form" className="medicalHistoryForm">
      <Box>
        <TextField label="Numero de Historia" name="numeroHistoriaClinica" />
      </Box>
      <Box>
        <Select defaultValue="DNI" name="tipoDocumento">
          <MenuItem value={"DNI"}>DNI</MenuItem>
          <MenuItem value={"LE"}>LE</MenuItem>
          <MenuItem value={"LC"}>LC</MenuItem>
          <MenuItem value={"CI"}>CI</MenuItem>
        </Select>
        <TextField label="Numero de documento" name="numeroDocumento" />
      </Box>
      <Box>
        <TextField label="Nombre" name="nombres" />
      </Box>
      <Box>
        <TextField label="Apellido" name="apellidos" />
      </Box>
      <Box>
        <TextField label="Nacionalidad" name="nacionalidad" />
      </Box>
      <Box>
        <TextField label="Sexo" name="numeroDocumento" />
      </Box>
      <Box>
        <TextField label="Edad" name="edad" />
      </Box>
      <Box>
        <TextField label="Ocupación actual" name="ocupacionActual" />
      </Box>
      <Box>
        <TextField label="Estado civil" name="estadoCivil" />
      </Box>
      <Box>
        <TextField label="Domicilio actual" name="domicilioActual" />
      </Box>
      <Box>
        <TextField label="Raza" name="raza" />
      </Box>
    </Box>
  );
}
