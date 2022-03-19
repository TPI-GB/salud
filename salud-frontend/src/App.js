import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
//Pages
import Login from "./pages/login";
import Home from "./pages/home/home";
import MostrarUsuarios from "./components/MostrarUsuarios";
import SearchMH from "./components/SearchMH";
import MedicalHistory from "./pages/medicalHistory/MedicalHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import FormularioDeUsuario from "./components/FormularioUsuario/FormularioUsuario";
import CreateMH from "./pages/createMH";
import CreateConsultation from "./pages/createConsultation";
import GuardedRoute from "./components/GuardedRoute";
import Navbar from "./components/Header/Navbar";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/" to={"/Home"} />
        <>
          <Navbar />
          <GuardedRoute exact path="/Home" component={Home} />
          <GuardedRoute exact path="/Usuarios" component={MostrarUsuarios} />
          <GuardedRoute exact path="/HistoriasClinicas" component={SearchMH} />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/Crear"
            component={CreateMH}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/Editar/:id"
            component={CreateMH}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/Detalles/:id"
            component={MedicalHistory}
          />
          <GuardedRoute exact path="/Estadisticas" component={Dashboard} />
          <GuardedRoute
            exact
            path="/FormularioDeUsuario"
            component={FormularioDeUsuario}
          />
          <GuardedRoute
            exact
            path="/NuevaConsulta"
            component={CreateConsultation}
          />
        </>
      </Switch>
    </Router>
  );
}

export default App;
