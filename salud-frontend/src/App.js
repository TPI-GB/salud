import './App.css';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Navbar from './components/NavBar/Navbar';

//Pages
import Login from './pages/login';
import Home from './pages/home';
import MostrarUsuarios from './components/MostrarUsuarios/MostrarUsuarios';
import NuevoPaciente from './components/NuevoPaciente/NuevoPaciente';
import BuscarPaciente from './components/BuscarPaciente/BuscarPaciente';

function App() {
  return (
    <Router>
      <Navbar>
        <Routes>
          <Route exact path="/" component={Home} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/MostrarUsuarios" component={MostrarUsuarios} />
          <Route exact path="/NuevoPaciente" component={NuevoPaciente} />
          <Route exact path="/BuscarPaciente" component={BuscarPaciente} />
        </Routes>
      </Navbar>
    </Router>
  );
}

export default App;
