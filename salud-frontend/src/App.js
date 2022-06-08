import "./App.css";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Login from "./pages/login";
import Home from "./pages/home/home";
import PinnedSubheaderList from "./components/MostrarUsuarios/MostrarUsuariosSinModal";
import SearchMH from "./components/SearchMH";
import MedicalHistory from "./pages/medicalHistory/MedicalHistory";
import Dashboard from "./components/Dashboard/Dashboard";
import CreateUser from "./pages/createUser/CreateUser";
import CreateMH from "./pages/createMH";
import CreateConsultation from "./pages/createConsultation";
import CreateMT from "./pages/createMT";
import GuardedRoute from "./components/GuardedRoute";
import Navbar from "./components/Header/Navbar";
import ConfirmarPass from "./pages/login/confirmarPass";
import RecuperarPass from "./pages/login/recuperarPass";
import error401 from "./pages/error401/error401";
import jwtInterceptor from "./services/interceptors";

jwtInterceptor();
function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/resetPass" component={RecuperarPass} />
        <Route exact path="/confirmarPass/:token" component={ConfirmarPass} />
        <Route exact path="/login" component={Login} />
        <Redirect exact from="/" to={"/Home"} />
        <>
          <Navbar />
          <GuardedRoute
            exact
            path="/Home"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={Home}
          />
          <GuardedRoute
            exact
            path="/Usuarios"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={PinnedSubheaderList}
          />
          {/* <GuardedRoute
          exact
          path="/MostrarUsuarios"
          component={LayoutTemplate(PinnedSubheaderList)}
        /> */}
          <GuardedRoute
            exact
            path="/NuevoUsuario"
            roles={["Admin", "Director"]}
            component={CreateUser}
          />
          <GuardedRoute
            exact
            path="/EditarUsuario/:id"
            roles={["Admin", "Director"]}
            component={CreateUser}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={SearchMH}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/Crear"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={CreateMH}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/Editar/:id"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={CreateMH}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/Detalles/:id"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={MedicalHistory}
          />
          <GuardedRoute
            exact
            path="/Estadisticas"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={Dashboard}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/:idHistoria/estudios"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={CreateMT}
          />
          <GuardedRoute
            exact
            path="/HistoriasClinicas/:idHistoria/estudios/:idEstudio"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={CreateMT}
          />

          {/* <GuardedRoute
            exact
            path="/FormularioDeUsuario"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={FormularioDeUsuario}
          /> */}
          <GuardedRoute
            exact
            path="/NuevaConsulta"
            roles={[
              "Admin",
              "Laboratorio",
              "Recepcion",
              "Medico",
              "Secretaria",
            ]}
            component={CreateConsultation}
          />
          <Route exact path="/error401" component={error401} />
        </>
      </Switch>
    </Router>
  );
}

export default App;
