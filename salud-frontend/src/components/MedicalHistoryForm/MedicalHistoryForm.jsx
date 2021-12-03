import React, { useState, useEffect } from "react";
import { getMedicalHistoryById } from "../../services/medical-history-service";
import { useParams } from "react-router";
import {
  Box,
  TextField,
  Select,
  MenuItem,
  Button,
  Radio,
  RadioGroup,
  Grid,
  FormControl,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import {
  createMedicalHistory,
  editMedicalHistory,
} from "../../services/medical-history-service";
import CountrySelector from "./CountrySelector";
import "./MedicalHistoryForm.scss";

export default function MedicalHistoryForm() {
  const [info, setInfo] = useState({
    numeroHistoriaClinica: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    nombre: "",
    apellido: "",
    nacionalidad: "Argentina",
    sexo: "femenino",
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

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
    console.log(info);
  };

  const handleEdit = (event) => {
    event.preventDefault();
    editMedicalHistory(id, info)
      .then(() => {
        console.log("success!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    createMedicalHistory(info)
      .then(() => {
        console.log("success!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Box component="form">
      <Grid container>
        <Grid item xs={6}>
          <Box className="fieldsContainer">
            <TextField
              label="Numero de Historia"
              name="numeroHistoriaClinica"
              onChange={handleChange}
              value={info.numeroHistoriaClinica}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />
            <Select
              defaultValue="DNI"
              value={info.tipoDocumento}
              name="tipoDocumento"
              onChange={handleChange}
              sx={{
                mt: "8px",
                mb: "4px",
                marginRight: "5px",
                minWidth: "80px",
                maxWidth: "80px",
              }}
            >
              <MenuItem value={"DNI"}>DNI</MenuItem>
              <MenuItem value={"LE"}>LE</MenuItem>
              <MenuItem value={"LC"}>LC</MenuItem>
              <MenuItem value={"CI"}>CI</MenuItem>
            </Select>
            <TextField
              label="Numero de documento"
              name="numeroDocumento"
              onChange={handleChange}
              value={info.numeroDocumento}
              sx={{ mt: "8px", mb: "4px", maxWidth: "400px" }}
            />
            <TextField
              label="Nombre"
              name="nombre"
              onChange={handleChange}
              value={info.nombre}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <TextField
              label="Apellido"
              name="apellido"
              onChange={handleChange}
              value={info.apellido}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />
            <FormLabel sx={{ mt: "8px", mb: "4px", width: "100%" }}>
              País de origen
            </FormLabel>
            <CountrySelector
              defaultValue="Argentina"
              name="nacionalidad"
              onChange={handleChange}
              value={info.nacionalidad}
              fullWidth
            />

            <GenderCheckboxes
              onChange={handleChange}
              defaultValue={info.sexo}
              sx={{ mt: "8px", width: "100%" }}
            />
          </Box>
        </Grid>
        <Grid item xs={6}>
          <Box className="fieldsContainer">
            <TextField
              label="Edad"
              name="edad"
              onChange={handleChange}
              value={info.edad}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <TextField
              label="Ocupación actual"
              name="ocupacionActual"
              onChange={handleChange}
              value={info.ocupacionActual}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <TextField
              label="Estado civil"
              name="estadoCivil"
              onChange={handleChange}
              value={info.estadoCivil}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <TextField
              label="Domicilio actual"
              name="domicilioActual"
              onChange={handleChange}
              value={info.domicilioActual}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <TextField
              label="Raza"
              name="raza"
              onChange={handleChange}
              value={info.raza}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <Button
              type="button"
              variant="contained"
              onClick={id ? handleEdit : handleSubmit}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            >
              Crear
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function GenderCheckboxes({ onChange: handleChange, defaultValue, ...rest }) {
  console.log(defaultValue);
  return (
    <FormControl component="fieldset">
      <FormLabel {...rest}>Género</FormLabel>
      <RadioGroup value={defaultValue} name="sexo" row onChange={handleChange}>
        <FormControlLabel
          control={<Radio />}
          value="femenino"
          label="Femenino"
        />
        <FormControlLabel
          control={<Radio />}
          value="masculino"
          label="Masculino"
        />
      </RadioGroup>
    </FormControl>
  );
}
