import React from "react";
import { Grid, Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import Navbar from "../Navbar/Navbar";
import "fontsource-roboto";
import "../Dashboard/Dashboard.scss";
import StackedBarChartIcon from "@mui/icons-material/StackedBarChart";
import DonutSmallIcon from "@mui/icons-material/DonutSmall";
import ShowChartIcon from "@mui/icons-material/ShowChart";
import CardHeader from "../CardHeader/CardHeader.jsx";
import Graphics from "../Graphics/graphics";
import HorizontalBarChart from "../GraphicsBars/graphics";
import {
  getHistoryCount,
  getUserCount,
} from "../../services/estadisticas-service";
import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import SearchIcon from "@mui/icons-material/Search";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  iconos: {
    color: "green",
  },
  container: {
    paddingTop: "40px",
    alignItems: "center",
  },
  containerGrafica: {
    margintop: "40px",
  },
  containerTabla: {
    margintop: "40px",
  },
}));

export default function Dashboard(props) {
  const classes = useStyles();
  // const [dashboardData, setDashboardData] = useState({
  //   userData: "",
  //   historyData: "",
  // });
  const [stat1Data, setStat1Data] = useState({
    userData: 0,
  });
  const [stat2Data, setStat2Data] = useState({
    historyData: 0,
  });
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      console.log("refrescando datos");

      let responses = [
        getUserCount(startDate, endDate),
        getHistoryCount(startDate, endDate),
      ];
      Promise.all(responses)
        .then((res) => {
          //setDashboardData({ userData: res[0].data, historyData: res[1].data })
          setStat1Data({ userData: res[0].data });
          setStat2Data({ historyData: res[1].data });
        })
        .catch((e) => console.log(e));
    }, 3000);
    return () => clearInterval(interval);
  }, [startDate, endDate]);

  const onChange = (dates) => {
    const [start, end] = dates;
    setStartDate(start);
    setEndDate(end);
  };

  return (
    <div className={classes.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} />
        <Navbar />
      </Grid>

      <Grid container spacing={3} className={classes.container}>
        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <CardHeader
            icono={<StackedBarChartIcon className={classes.iconos} />}
            titulo="Cantidad de Usuarios"
            texto={stat1Data.userData}
            color="red"
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <CardHeader
            icono={<ShowChartIcon className={classes.iconos} />}
            titulo="Cantidad de historias clinicas"
            texto={stat2Data.historyData}
            color="red"
          />
        </Grid>

        <Grid item xs={12} sm={4} md={4} lg={4} xl={4}>
          <CardHeader
            icono={<ShowChartIcon className={classes.iconos} />}
            titulo="Cantidad semanal de medicos logeados"
            texto="Muestra la cantidad semanal de medicos logeados"
            color="red"
          />
        </Grid>

        <Grid
          container
          spacing={1}
          className={classes.container}
          xs={12}
          sm={6}
          md={6}
          lg={6}
          xl={6}
        >
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardHeader
              icono={<DonutSmallIcon className={classes.iconos} />}
              titulo="1"
              texto="1"
              color="red"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardHeader
              icono={<DonutSmallIcon className={classes.iconos} />}
              titulo="2"
              texto="2"
              color="red"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <CardHeader
              icono={<ShowChartIcon className={classes.iconos} />}
              titulo="3"
              texto="3"
              color="red"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={6} lg={6} xl={6}>
            <DatePicker
              selected={startDate}
              onChange={onChange}
              startDate={startDate}
              endDate={endDate}
              selectsRange
              inline
            />
            <Button
              variant="contained"
              endIcon={<SearchIcon />}
              onClick={() => {
                setStartDate(DatePicker.startDate);
                setEndDate(DatePicker.endDate);
              }}
            >
              BUSCAR
            </Button>
          </Grid>
        </Grid>
        <Grid item xs={0} sm={0} md={1} lg={1} xl={1}></Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          classname={classes.container}
        >
          <Graphics
            labels={["Marzo", "Abril", "Mayo", "Junio", "Julio", "Agosto"]}
            data={[10, 25, 17, 32, 57, 199]}
          />
        </Grid>
        <Grid
          item
          xs={12}
          sm={12}
          md={5}
          lg={5}
          xl={5}
          classname={classes.container}
        >
          <HorizontalBarChart />
        </Grid>
      </Grid>
    </div>
  );
}
