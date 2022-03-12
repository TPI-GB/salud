import './App.css';
import Navbar from './components/Header/Navbar';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import GuardedRoute from './components/GuardedRoute/GuardedRoute';

//Pages
import Login from './pages/login/Login';
import Home from './pages/home/home';
import MostrarUsuarios from './components/MostrarUsuarios/MostrarUsuarios';
import NuevaHC from './pages/nuevaHC/NuevaHC';
import BuscarHC from './pages/BuscarHC/BuscarHC';
import FormularioUsuario from './components/FormularioUsuario/FormularioUsuario';
import Dashboard from './components/Dashboard/Dashboard';


function App() {
  return (
    
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <div>
            <Navbar />
            <GuardedRoute exact path="/" component={Home} />
            <GuardedRoute exact path="/mostrarUsuarios" component={MostrarUsuarios} />
            <GuardedRoute exact path="/nuevaHC" component={NuevaHC} />
            <GuardedRoute exact path="/buscarHC"  component={BuscarHC} />
            <GuardedRoute exact path="/formularioUsuario" component={FormularioUsuario} />
            <GuardedRoute exact path="/dashboard" component={Dashboard} />
          </div>
        </Switch> 
      </Router>
  );
}

export default App;
