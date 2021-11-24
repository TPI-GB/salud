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

function App() {
  return (
    <Router>
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
    </Router>
  );
}

export default App;
