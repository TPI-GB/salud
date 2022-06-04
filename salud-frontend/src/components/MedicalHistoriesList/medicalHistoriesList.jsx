import React from "react";
import { List, ListItem, ListItemText, Fab, Tooltip } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import ForwardIcon from "@mui/icons-material/Forward";

export default function MedicalHistoriesList(props) {
  const { mhList } = props;
  console.log(mhList);
  return (
    <List
      sx={{ minWidth: 300, maxWidth: 500, ml: "auto", mr: "auto", mt: "4px" }}
    >
      {mhList.map((medicalHistory) => (
        <ListItem
          key={medicalHistory._id}
          sx={{ border: "2px solid", borderRadius: "25px", mt: "4px" }}
        >
          <RenderMedicalHistory mh={medicalHistory} />
        </ListItem>
      ))}
    </List>
  );
}

function RenderMedicalHistory(props) {
  const { mh } = props;

  return (
    <>
      <ListItemText
        primary={"Paciente: " + mh.nombre + " " + mh.apellido}
        secondary={"Número de historia " + mh.numeroHistoriaClinica}
      />
      <Tooltip title="Editar">
        <Fab
          color="secondary"
          size="small"
          sx={{ mr: 1 }}
          component={Link}
          to={`/HistoriasClinicas/Editar/${mh._id}`}
        >
          <EditIcon />
        </Fab>
      </Tooltip>
      <Tooltip title="Ver">
        <Fab
          color="secondary"
          size="small"
          component={Link}
          to={`/HistoriasClinicas/Detalles/${mh._id}`}
        >
          <ForwardIcon />
        </Fab>
      </Tooltip>
    </>
  );
}
