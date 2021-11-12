import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Login from "./pages/login";
import Home from "./pages/home/home";
import MostrarUsuarios from "./components/MostrarUsuarios";
import NuevoPaciente from "./components/NuevoPaciente/NuevoPaciente";
import BuscarPaciente from "./components/BuscarPaciente/BuscarPaciente";
import Dashboard from "./components/Dashboard/Dashboard";
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
        <GuardedRoute exact path="/BuscarPaciente" component={BuscarPaciente} />
        <GuardedRoute exact path="/Estadisticas" component={Dashboard} />
      </Switch>
    </Router>
  );
}

export default App;
