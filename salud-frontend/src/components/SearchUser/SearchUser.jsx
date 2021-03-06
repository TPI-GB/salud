import React, { useState } from "react";
import {
  IconButton,
  Box,
  Typography,
  Alert,
  CircularProgress,
  Paper,
  InputBase,
  Collapse,
  Divider,
  MenuItem,
  Select,
  Fab,
  Tooltip,
} from "@mui/material";
import { Link } from "react-router-dom";
import SearchIcon from "@mui/icons-material/Search";
import AddIcon from "@mui/icons-material/Add";
import UserList from "../UserList";
import FormHeader from "../FormHeader";
import { getUsers, getUserById } from "../../services/user-service";
import "./SearchMH.scss";

// Preguntar por el useState porque imprime siempre que cambia de estado
export default function SearchMH() {
  const [primarySearchValue, setPrimaryprimarySearchValue] = useState("");
  const [filter, setFilter] = useState("DOC");
  const [docType, setDocType] = useState("DNI");
  const [medicalHistories, setMedicalHistories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [firstTime, setFirstTime] = useState(true);
  const [error, setError] = useState({ message: "", show: false });

  const handleSearchChange = (event) => {
    setPrimaryprimarySearchValue(event.target.value);
  };

  const handleFilterChange = (event) => {
    const value = event.target.value;
    setFilter(value);
    setError({ show: false });
    if (value === "TODAS") {
      setPrimaryprimarySearchValue("");
    }
  };

  const handleDocChange = (event) => {
    setDocType(event.target.value);
    setError({ show: false });
  };

  const validateSearchInput = () => {
    if (!/^(?!\s*$).+/.test(primarySearchValue)) {
      setError({
        message: "El campo de busqueda esta vacío, ingrese un número.",
        show: true,
      });
    } else if (!/^[1-9][0-9]{6,8}$/i.test(primarySearchValue)) {
      setError({
        message: "En numero de documento ingresado es inválido.",
        show: true,
      });
    } else {
      handleSearch();
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    if (filter === "TODAS") {
      const response = await getAllMedicalHistories();
      setMedicalHistories(response.data);
    } else {
      const response = await getMedicalHistoryByDocument(
        docType,
        primarySearchValue
      );
      setMedicalHistories(response.data ? [response.data] : []);
    }
    setError({ show: false });
    setIsLoading(false);
    setFirstTime(false);
  };

  return (
    <Box sx={{ minHeight: "100vh", backgroundColor: "#DFDFDF" }}>
      <FormHeader
        title="Historias clínicas"
        subTitle={"Búsqueda"}
        icon={<ScreenSearchDesktopIcon fontSize="large" />}
      />
      <Box className="listContainer">
        <Box sx={{ display: "flex" }}>
          <Paper
            component="form"
            sx={{
              p: "2px 4px",
              display: "flex",
              alignItems: "center",
              minWidth: 300,
              maxWidth: 350,
              mt: 2,
              ml: "auto",
              mr: "auto",
            }}
          >
            <Select value={filter} onChange={handleFilterChange} size="small">
              <MenuItem value={"DOC"}>DOC</MenuItem>
              <MenuItem value={"TODAS"}>TODAS</MenuItem>
            </Select>
            {filter === "DOC" && (
              <Select
                value={docType}
                onChange={handleDocChange}
                size="small"
                sx={{ ml: 0.5 }}
              >
                <MenuItem value={"DNI"}>DNI</MenuItem>
                <MenuItem value={"LE"}>LE</MenuItem>
                <MenuItem value={"LC"}>LC</MenuItem>
                <MenuItem value={"CI"}>CI</MenuItem>
              </Select>
            )}
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <InputBase
              sx={{ ml: 1, flex: 1 }}
              placeholder="Buscar..."
              onChange={handleSearchChange}
              disabled={filter === "TODAS"}
              value={primarySearchValue}
            />
            <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
            <IconButton
              type="button"
              sx={{ p: "10px" }}
              aria-label="search"
              onClick={filter === "TODAS" ? handleSearch : validateSearchInput}
            >
              <SearchIcon />
            </IconButton>
          </Paper>
          <Tooltip title="Crear nueva historia">
            <Fab
              size="large"
              sx={{ mr: 1, mt: 2 }}
              component={Link}
              to={"/NuevaHistoriaClinica"}
            >
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>
        <Box
          sx={{
            ml: "auto",
            mr: "auto",
            mt: "5px",
            minWidth: 300,
            maxWidth: 500,
          }}
        >
          <Collapse in={error.show}>
            <Alert
              severity="error"
              sx={{ borderRadius: "25px", mt: 1 }}
              onClose={() => {
                setError({ message: "", show: false });
              }}
            >
              {error.message}
            </Alert>
          </Collapse>
        </Box>
        <MedicalHistoriesList mhList={medicalHistories} />
        {isLoading && (
          <Box className="centered">
            <CircularProgress size={150} />
          </Box>
        )}
        {!isLoading && medicalHistories.length === 0 && !firstTime && (
          <Box className="centered">
            <Typography variant="h4" component="div">
              No hay resultados.
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
}
