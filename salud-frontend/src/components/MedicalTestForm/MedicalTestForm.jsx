import React, { useEffect, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import {
  Box,
  TextField,
  Alert,
  Collapse,
  Button,
  Typography,
} from "@mui/material";
import MultipleFileUploadField from "./DropzoneUploader/MultipleFileUploadField";
import Loading from "../Loading";
import {
  saveImageAndGetName,
  getMedicalTestByIds,
  createMedicalTest,
  editMedicalTest,
} from "../../services/medical-history-service";

export default function MedicalTestForm(props) {
  const { buttonText, idHistoria, idEstudio } = props;
  const [loading, setLoading] = useState(true);
  const [info, setInfo] = useState({
    nombre: "",
    textoLibre: "",
    archivos: [],
  });
  const [errors, setErrors] = useState({
    nombre: { message: "", error: false },
    archivos: { message: "", error: false },
  });
  const [alert, setAlert] = useState({
    show: false,
    message: "",
    severity: "success",
  });

  const history = useHistory();

  useEffect(() => {
    const getData = async () => {
      const response = await getMedicalTestByIds(idHistoria, idEstudio);
      setInfo(response.data[0].estudios[0]);
      setLoading(false);
    };
    if ((idHistoria, idEstudio)) {
      getData();
    } else {
      setLoading(false);
    }
  }, [idHistoria, idEstudio]);

  if (loading) {
    return <Loading />;
  }

  function validate() {
    const temp = { ...errors };

    if (!info["nombre"].trim()) {
      temp["nombre"] = { message: "Requerido.", error: true };
    } else {
      temp["nombre"] = { message: "", error: false };
    }

    if (info["archivos"].length === 0) {
      temp["archivos"] = {
        message: "Debe haber al menos un archivo en el estudio",
        error: true,
      };
    } else {
      temp["archivos"] = { message: "", error: false };
    }

    setErrors(temp);

    return temp;
  }

  function noErrors(errorsList) {
    const boolErrors = [];
    for (const field in errorsList) {
      boolErrors.push(errorsList[field].error);
    }
    return !boolErrors.some(Boolean);
  }

  function returnToDetails(time) {
    setTimeout(function () {
      history.push(`/HistoriasClinicas/Detalles/${idHistoria}`);
    }, time);
  }

  const handleChange = (event) => {
    const { name, value } = event.target;
    setInfo({ ...info, [name]: value });
  };

  const handleFiles = (event) => {
    setInfo({ ...info, archivos: event.target.files });
  };

  const sendHandler = async () => {
    let arrayImages = [];
    for (var i = 0; i < info.archivos.length; i++) {
      const response = await saveImageAndGetName(info.archivos[i]);
      arrayImages.push(response);
    }
    return arrayImages;
  };

  function handleChangeStatus(loadedFiles) {
    setInfo({ ...info, archivos: loadedFiles });
  }

  function handleEdit(event) {
    event.preventDefault();
    if (noErrors(validate())) {
      editMedicalTest(idHistoria, idEstudio, info)
        .then(() => {
          console.log("success!");
          setAlert({
            show: true,
            message: "La edición fue exitosa!.",
            severity: "success",
          });
          returnToDetails(2000);
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
  }

  async function handleSubmit(event) {
    event.preventDefault();

    if (noErrors(validate())) {
      createMedicalTest(idHistoria, { ...info, archivos: await sendHandler() })
        .then(() => {
          console.log("success!");
          setAlert({
            show: true,
            message: "La creación fue exitosa!.",
            severity: "success",
          });
          returnToDetails(2000);
        })
        .catch((err) => {
          console.log(err);
          console.log(info);
          setAlert({
            show: true,
            message: "Algo salio mal!",
            severity: "error",
          });
        });
    }
  }

  return (
    <Box component="form">
      <TextField
        label="Nombre del estudio"
        name="nombre"
        onChange={handleChange}
        value={info.nombre}
        error={errors.nombre.error}
        helperText={errors.nombre.message}
        sx={{ mt: "4px", mb: "4px", width: "100%" }}
      />
      <TextField
        label="Descripción"
        name="textoLibre"
        onChange={handleChange}
        value={info.textoLibre}
        multiline
        rows={4}
        sx={{ mt: "4px", mb: "4px", width: "100%" }}
      />
      {errors.archivos.error && (
        <Typography>{errors.archivos.message}</Typography>
      )}
      <MultipleFileUploadField
        onChange={handleChangeStatus}
        initialFiles={info.archivos}
        filesLimit={100}
      />
      <input
        id="fileinput"
        name="archivos"
        type="file"
        onChange={handleFiles}
        multiple
      />
      <Box display={"flex"} justifyContent={"space-between"}>
        <Button
          type="button"
          variant="contained"
          color="error"
          component={Link}
          to={`/HistoriasClinicas/Detalles/${idHistoria}`}
          sx={{ mt: "8px", mb: "4px", width: "49%" }}
        >
          Cancelar
        </Button>

        <Button
          type="button"
          variant="contained"
          onClick={idEstudio ? handleEdit : handleSubmit}
          sx={{ mt: "8px", mb: "4px", width: "49%" }}
        >
          {buttonText}
        </Button>
      </Box>
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
  );
}
