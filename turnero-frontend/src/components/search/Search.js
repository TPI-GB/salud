import {
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  TextField,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import petitions from "../petitions";

export default function Search() {
  const { handleSubmit } = useForm();

  const onSubmit = async () => {
    let data = {};
    data.medico = medico;
    data.fecha = date;
    const turnos = await petitions.GetTurnosFilter(data);
    setTurnos(turnos);
  };

  const [date, setDate] = useState([]);
  const [turnos, setTurnos] = useState([]);
  const [medico, setMedico] = useState([]);

  const getData = async () => {};

  useEffect(() => {
    getData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChangeMedico = (event) => {
    const {
      target: { value },
    } = event;
    setMedico(value);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="estilosDeSelect">
        <FormControl sx={{ ml: 2, mr: 2, width: 250 }}>
          <InputLabel id="medico-multiple-checkbox-label"></InputLabel>
          <InputLabel id="medico-label">Medico</InputLabel>
          <Select
            labelId="medico-label"
            label="Medico"
            onChange={handleChangeMedico}
          >
            <MenuItem value={"Todas"}>Medico</MenuItem>
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
  );
}
