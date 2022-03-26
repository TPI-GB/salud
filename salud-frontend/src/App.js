import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";

//Pages
import Login from "./pages/login";
import Home from "./pages/home/home";
import PinnedSubheaderList from "./components/MostrarUsuarios/MostrarUsuariosSinModal";
import SearchMH from "./components/SearchMH";
import MedicalHistory from "./components/MedicalHistory/MedicalHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import FormularioDeUsuario from "./components/FormularioUsuario/FormularioUsuario";
import CreateUser from "./pages/createUser/CreateUser";
import CreateMH from "./pages/createMH";
import GuardedRoute from "./components/GuardedRoute";
import LayoutTemplate from "./pages/layoutTemplate";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <GuardedRoute exact path="/" component={LayoutTemplate(Home)} />
        <GuardedRoute
          exact
          path="/MostrarUsuarios"
          component={LayoutTemplate(PinnedSubheaderList)}
        />
        <GuardedRoute
          exact
          path="/HistoriasClinicas"
          component={LayoutTemplate(SearchMH)}
        />
        <GuardedRoute
          exact
          path="/HistoriaClinica/:id"
          component={LayoutTemplate(MedicalHistory)}
        />
        <GuardedRoute
          exact
          path="/Estadisticas"
          component={LayoutTemplate(Dashboard)}
        />
        <GuardedRoute
          exact
          path="/FormularioDeUsuario"
          component={LayoutTemplate(FormularioDeUsuario)}
        />
        <GuardedRoute
          exact
          path="/NuevoUsuario"
          component={LayoutTemplate(CreateUser)}
        />
        <GuardedRoute
          exact
          path="/EditarUsuario/:id"
          component={LayoutTemplate(CreateUser)}
        />
        <GuardedRoute
          exact
          path="/NuevaHistoriaClinica"
          component={LayoutTemplate(CreateMH)}
        />
        <GuardedRoute
          exact
          path="/EditarHistoriaClinica/:id"
          component={LayoutTemplate(CreateMH)}
        />
      </Switch>
    </Router>
  );
}

export default App;
