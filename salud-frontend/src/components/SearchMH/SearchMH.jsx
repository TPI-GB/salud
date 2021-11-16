import React, { useState } from "react"
import { IconButton, Box, Typography, CircularProgress, Paper, InputBase, Divider, MenuItem, Select } from "@mui/material"
import SearchIcon from "@mui/icons-material/Search";
import MedicalHistoriesList from "../MedicalHistoriesList"
import {getAllMedicalHistories, getMedicalHistoryByDocument} from "../../services/medicalHistoryService"
import "./SearchMH.scss"

// Preguntar por el useState porque imprime siempre que cambia de estado
  export default function SearchMH() {
    const [searchValue, setSearchValue] = useState("");
    const [filter, setFilter] = useState("DOC");
    const [docType, setDocType] = useState("DNI");
    const [medicalHistories, setMedicalHistories] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [firstTime, setFirstTime] = useState(true);
    
    const handleSearchChange = (event) => {
      setSearchValue(event.target.value);
    }

    const handleFilterChange = (event) => {
      const value = event.target.value;
      setFilter(value);
      if(value === "TODAS"){
        setSearchValue("");
      }
    }

    const handleDocChange = (event) => {
      setDocType(event.target.value)
    }

    const handleSearch = async () => {
      setIsLoading(true);
      if(filter==="TODAS"){
          const response = await getAllMedicalHistories();
          setMedicalHistories(response.data);
      }else{
        const response = await getMedicalHistoryByDocument(docType, searchValue);
          setMedicalHistories(response.data);
      }
      setIsLoading(false);
      setFirstTime(false);
    }

    return (
      <>
      <Paper
      component="form"
      sx={{ p: '2px 4px', display: 'flex', alignItems: 'center' ,minWidth:300, maxWidth:350, mt:2, ml:"auto", mr:"auto"}}
    >
      <Select
    value={filter}
    onChange={handleFilterChange}
    size="small"
  >
    <MenuItem value={"DOC"}>DOC</MenuItem>
    <MenuItem value={"TODAS"}>TODAS</MenuItem>
  </Select>
  { filter === "DOC" && (
      <Select
      value={docType}
      onChange={handleDocChange}
      size="small"
    >
      <MenuItem value={"DNI"}>DNI</MenuItem>
      <MenuItem value={"LE"}>LE</MenuItem>
      <MenuItem value={"LC"}>LC</MenuItem>
      <MenuItem value={"CI"}>CI</MenuItem>
    </Select>
  )
  }
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <InputBase
        sx={{ ml: 1, flex: 1 }}
        placeholder="Buscar historias clinicas..."
        onChange={handleSearchChange}
        disabled={filter==="TODAS"}
        value={searchValue}
      />
      <Divider sx={{ height: 28, m: 0.5 }} orientation="vertical" />
      <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={handleSearch}>
        <SearchIcon />
      </IconButton>
    </Paper>
      <MedicalHistoriesList mhList={medicalHistories} />
      {
        firstTime && (
          <Box className="centered">
            <Typography variant="h4" component="div">
              Tipea algo para buscar.
            </Typography>
          </Box>
        )
      }
      {
        isLoading && (
          <Box className="centered">
            <CircularProgress size={150} />
          </Box>
        )
      }
      {
        !isLoading && medicalHistories.length === 0 && !firstTime  && (
          <Box className="centered">
            <Typography variant="h4" component="div">
              No hay resultados.
            </Typography>
          </Box>
        )
      }
      </>
    )
  }

  