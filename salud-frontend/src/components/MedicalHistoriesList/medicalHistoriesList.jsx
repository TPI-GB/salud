import React from "react";
import { List, ListItem, ListItemText, Fab } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import { Link } from "react-router-dom";
import ForwardIcon from "@mui/icons-material/Forward";

export default function MedicalHistoriesList(props) {
  const { mhList } = props;

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

  console.log(mh);

  return (
    <>
      <ListItemText
        primary={mh.nombres + " " + mh.apellidos}
        secondary={mh.numeroHistoriaClinica}
      />
      <Fab color="secondary" size="small" sx={{ mr: 1 }}>
        <EditIcon />
      </Fab>
      <Fab
        color="secondary"
        size="small"
        component={Link}
        to={`/HistoriaClinica/${mh._id}`}
      >
        <ForwardIcon />
      </Fab>
    </>
  );
}