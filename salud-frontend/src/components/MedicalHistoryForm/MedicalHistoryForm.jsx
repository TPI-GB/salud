import React, { useState, useEffect } from "react";
import { getMedicalHistoryById } from "../../services/medical-history-service";
import { Link, useHistory } from "react-router-dom";
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
  Alert,
  Collapse,
  FormHelperText,
  FormLabel,
  FormControlLabel,
} from "@mui/material";
import {
  createMedicalHistory,
  editMedicalHistory,
} from "../../services/medical-history-service";
import CountrySelector from "./CountrySelector";
import "./MedicalHistoryForm.scss";

export default function MedicalHistoryForm(props) {
  const { buttonText, id } = props;
  const [info, setInfo] = useState({
    numeroHistoriaClinica: "",
    tipoDocumento: "DNI",
    numeroDocumento: "",
    nombre: "",
    apellido: "",
    paisDeNacimiento: "Argentina",
    sexo: "femenino",
    edad: "",
    ocupacionActual: "",
    estadoCivil: "",
    domicilioActual: "",
  });
  const [errors, setErrors] = useState({
    numeroHistoriaClinica: { message: "", error: false },
    numeroDocumento: { message: "", error: false },
    nombre: { message: "", error: false },
    apellido: { message: "", error: false },
    edad: { message: "", error: false },
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "success",
  });

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await getMedicalHistoryById(id);
      setInfo(response.data);
    };
    if (id) {
      getData();
    }
  }, [id]);

  function validate() {
    const requiredFields = [
      "numeroHistoriaClinica",
      "numeroDocumento",
      "nombre",
      "apellido",
      "edad",
    ];
    const temp = { ...errors };
    requiredFields.forEach((field) => {
      if (!info[field] || !/^(?!\s*$).+/.test(info[field])) {
        temp[field] = { message: "Requerido.", error: true };
      } else {
        temp[field] = { message: "", error: false };
      }
    });
    setErrors(temp);
  }

  function noErrors() {
    const boolErrors = [];
    for (const field in errors) {
      boolErrors.push(field.error);
    }
    return !boolErrors.every(Boolean);
  }

  function returnToSearchMH(time) {
    setTimeout(function () {
      history.push("/HistoriasClinicas");
    }, time);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleEdit = (event) => {
    event.preventDefault();
    validate();
    if (noErrors()) {
      editMedicalHistory(id, info)
        .then(() => {
          console.log("success!");
          setAlert({
            show: true,
            message: "La edición fue exitosa!.",
            severity: "success",
          });
          returnToSearchMH(2000);
        })
        .catch((err) => {
          setAlert({
            show: true,
            message: "Algo salio mal!",
            severity: "error",
          });
          console.log(err);
        });
    }
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    validate();
    if (noErrors()) {
      createMedicalHistory(info)
        .then(() => {
          console.log("success!");
          setAlert({
            show: true,
            message: "La creación fue exitosa!.",
            severity: "success",
          });
          returnToSearchMH(2000);
        })
        .catch((err) => {
          console.log(err);
          setAlert({
            show: true,
            message: "Algo salio mal!",
            severity: "error",
          });
        });
    }
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
              error={errors.numeroHistoriaClinica.error}
              helperText={errors.numeroHistoriaClinica.message}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />
            <FormControl
              sx={{ width: "100%" }}
              error={errors.numeroDocumento.error}
            >
              <Box sx={{ display: "flex" }}>
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
                  error={errors.numeroDocumento.error}
                  sx={{ mt: "8px", mb: "4px", width: "100%" }}
                />
              </Box>
              {errors.numeroDocumento.error && (
                <FormHelperText>Requerido.</FormHelperText>
              )}
            </FormControl>

            <TextField
              label="Nombre"
              name="nombre"
              onChange={handleChange}
              value={info.nombre}
              error={errors.nombre.error}
              helperText={errors.nombre.message}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />

            <TextField
              label="Apellido"
              name="apellido"
              onChange={handleChange}
              value={info.apellido}
              error={errors.apellido.error}
              helperText={errors.apellido.message}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            />
            <FormLabel sx={{ mt: "8px", mb: "4px", width: "100%" }}>
              País de nacimiento
            </FormLabel>
            <CountrySelector
              defaultValue="Argentina"
              name="paisDeNacimiento"
              onChange={handleChange}
              value={info.paisDeNacimiento}
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
              inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
              error={errors.edad.error}
              helperText={errors.edad.message}
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

            <Button
              type="button"
              variant="contained"
              color="error"
              component={Link}
              to="/HistoriasClinicas"
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            >
              Cancelar
            </Button>

            <Button
              type="button"
              variant="contained"
              onClick={id ? handleEdit : handleSubmit}
              sx={{ mt: "8px", mb: "4px", width: "100%" }}
            >
              {buttonText}
            </Button>
            <Collapse in={alert.show} sx={{ mt: "8px" }}>
              <Alert
                severity={alert.severity}
                onClose={() => {
                  setAlert({ ...alert, show: false });
                }}
              >
                {alert.message}
              </Alert>
            </Collapse>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}

function GenderCheckboxes({ onChange: handleChange, defaultValue, ...rest }) {
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
