import React from "react";
import { Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navbar/Navbar";
import 'fontsource-roboto';
import '../Dashboard/Dashboard.scss'
import StackedBarChartIcon from '@mui/icons-material/StackedBarChart';
import DonutSmallIcon from '@mui/icons-material/DonutSmall';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import  CardHeader  from "../CardHeader/CardHeader.jsx";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  iconos: {
    color: 'green'
  }
}));

export default function Dashboard(props) {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12}>
          <Navbar />
        </Grid>
          <CardHeader icono={<StackedBarChartIcon className={classes.iconos}/>} 
                titulo='Cantidad Semanal de Pacientes' texto="Muestra la cantidad de pacientes/semana" color='red'/>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  
        </Grid>
          <CardHeader icono={<DonutSmallIcon className={classes.iconos}/>} 
                titulo='Porcentaje de patologias' texto="Muestra las patologias mas comunes" color='red'/>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  
        </Grid>
          <CardHeader icono={<ShowChartIcon className={classes.iconos}/>} 
                titulo='Cantidad semanal de medicos logeados' texto="Muestra la cantidad semanal de medicos logeados" color='red'/>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
                  
        </Grid>
        <Grid container spacing={1} className={classes.container}>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardHeader icono={<ShowChartIcon className={classes.iconos}/>}  titulo='1' texto="1" color='red'/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardHeader icono={<ShowChartIcon className={classes.iconos}/>}  titulo='2' texto="2" color='red'/>  
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardHeader icono={<ShowChartIcon className={classes.iconos}/>}  titulo='3' texto="3" color='red'/>
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
                <CardHeader icono={<ShowChartIcon className={classes.iconos}/>}  titulo='4' texto="4" color='red'/>
          </Grid>
        </Grid>
      </Grid>
    </div>
  );
}

