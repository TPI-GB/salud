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
import MedicalHistoryForm from "./components/MedicalHistoryForm";
import GuardedRoute from "./components/GuardedRoute";

function App() {
  return (
    <Router>
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
        <GuardedRoute
          exact
          path="/MostrarUsuarios"
          component={MostrarUsuarios}
        />
        <GuardedRoute
          exact
          path="/Formulario"
          component={FormularioDeUsuario}
        />
        <GuardedRoute
          exact
          path="/crear-historia-clinica"
          component={MedicalHistoryForm}
        />
      </Switch>
    </Router>
  );
}

export default App;
