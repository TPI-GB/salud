<<<<<<< HEAD
import './App.css';
import Navbar from './components/Header/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";

//Pages
import Login from './pages/login/Login';
import Home from './pages/home/home';
import MostrarUsuarios from './components/MostrarUsuarios/MostrarUsuarios';
import NuevaHC from './pages/nuevaHC/NuevaHC';
import BuscarHC from './pages/BuscarHC/BuscarHC';
import FormularioUsuario from './components/FormularioUsuario/FormularioUsuario';
//import Dashboard from './pages/dashboard/Dashboard';
=======
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Login from "./pages/login";
import Home from "./pages/home/home";
import MostrarUsuarios from "./components/MostrarUsuarios";
import NuevoPaciente from "./components/NuevoPaciente/NuevoPaciente";
import SearchMH from "./components/SearchMH";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import FormularioDeUsuario from "./components/FormularioUsuario/FormularioUsuario";
import GuardedRoute from "./components/GuardedRoute";
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308

function App() {
  return (
    <Router>
<<<<<<< HEAD
      <Navbar />
        <Switch>
          <Route exact path="/pages/login" component={Login} />
          <Route exact path="/pages/home" component={Home} />
          <Route exact path="/components/MostrarUsuarios" component={MostrarUsuarios} />
          <Route exact path="/pages/nuevaHC" component={NuevaHC} />
          <Route exact path="/pages/buscarHC" component={BuscarHC} />
          <Route exact path="/components/FormularioUsuario" component={FormularioUsuario} />
          {/* <Route exact path="pages/dashboard/" component={Dashboard} /> */}
        </Switch> 
=======
      <Switch>
        <GuardedRoute exact path="/" component={Home} />
        <Route exact path="/login" component={Login} />
        <GuardedRoute
          exact
          path="/MostrarUsuarios"
          component={MostrarUsuarios}
        />
        <GuardedRoute exact path="/NuevoPaciente" component={NuevoPaciente} />
        <GuardedRoute exact path="/BuscarPaciente" component={SearchMH} />
        <GuardedRoute
          exact
          path="/HistoriaClinica/:id"
          component={MedicalHistory}
        />
        <GuardedRoute exact path="/Estadisticas" component={Dashboard} />
        <GuardedRoute exact path="/MostrarUsuarios" component={MostrarUsuarios} />
        <GuardedRoute exact path="/Formulario" component={FormularioDeUsuario} />
      </Switch>
>>>>>>> 64fcbae0e1fb15b45d2fe3c06364b502925db308
    </Router>
  );
}

export default App;
