import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  NavLink
} from "react-router-dom";

//Pages
import Login from './pages/login';
import Home from './pages/home';
import MostrarUsuarios from './components/MostrarUsuarios';
import NuevoPaciente from './components/NuevoPaciente/NuevoPaciente';
import BuscarPaciente from './components/BuscarPaciente/BuscarPaciente';
import FormularioDeUsuario from './components/FormularioUsuario/';

function App() {
  return (
    <Router>
      <Switch>
      <div className="App">
	      <Route exact path="/" component={Home} />
	      <Route exact path="/login" component={Login} />
	      <Route exact path="/MostrarUsuarios" component={MostrarUsuarios} />
        <Route exact path="/NuevoPaciente" component={NuevoPaciente} />
        <Route exact path="/BuscarPaciente" component={BuscarPaciente} />
        <Route exact path="/Form" component={FormularioDeUsuario} />

      </div>
      </Switch>
    </Router>
  );
}

export default App;
