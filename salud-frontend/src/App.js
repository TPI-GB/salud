import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Navbar from "./components/Header/Navbar";

//Pages
import Login from "./pages/login";
import Home from "./pages/home/home";
import MostrarUsuarios from "./components/MostrarUsuarios";
import SearchMH from "./components/SearchMH";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import FormularioDeUsuario from "./components/FormularioUsuario/FormularioUsuario";
import CreateMH from "./pages/createMH";
import GuardedRoute from "./components/GuardedRoute";

function App() {
  return (
    <Router>
      <Navbar />
      <Switch>
        <Route exact path="/login" component={Login} />
        <GuardedRoute exact path="/" component={Home} />
        <GuardedRoute
          exact
          path="/MostrarUsuarios"
          component={MostrarUsuarios}
        />
        <GuardedRoute exact path="/HistoriasClinicas" component={SearchMH} />
        <GuardedRoute
          exact
          path="/HistoriaClinica/:id"
          component={MedicalHistory}
        />

        <GuardedRoute exact path="/Estadisticas" component={Dashboard} />
        <GuardedRoute
          exact
          path="/FormularioDeUsuario"
          component={FormularioDeUsuario}
        />
        <GuardedRoute exact path="/NuevaHistoriaClinica" component={CreateMH} />
        <GuardedRoute
          exact
          path="/EditarHistoriaClinica/:id"
          component={CreateMH}
        />
      </Switch>
    </Router>
  );
}

export default App;
