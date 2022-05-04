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
import GuardedRoute from "./components/GuardedRoute";
import Navbar from "./components/Header/Navbar";
import ResetPassword from "./pages/login/resetPassword";
import ResetPassword2 from "./pages/login/ressetPassword2";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/reset" component={ResetPassword} />
        <Route exact path="/resetpass" component={ResetPassword2} />
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
        </>
      </Switch>
    </Router>
  );
}

export default App;
