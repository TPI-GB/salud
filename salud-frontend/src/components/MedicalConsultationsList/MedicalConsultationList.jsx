import React from "react";
import {
  Box,
  Grid,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListSubheader,
  Divider,
} from "@mui/material";
import MasksIcon from "@mui/icons-material/Masks";

export default function MedicalConsultationList(props) {
  const { consultas } = props;

  return (
    <Box>
      <List subheader={<ListSubheader>Consultas</ListSubheader>}>
        {consultas.map((consulta) => {
          return <ConsultationItemList consultaInfo={consulta} />;
        })}
      </List>
    </Box>
  );
}

function ConsultationItemList(props) {
  const { consultaInfo } = props;

  return (
    <Paper>
      <ListItem>
        <ListItemIcon>
          <MasksIcon />
        </ListItemIcon>
        {consultaInfo.doctor}
      </ListItem>
    </Paper>
  );
}
