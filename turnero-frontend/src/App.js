import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import CrearDisponibilidad from "./components/crearDisponibilidad";
import BorrarDisponibilidad from "./components/borrarDisponibilidad";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route
            path="/crearDisponibilidad"
            element={<CrearDisponibilidad />}
          />
        </Routes>
        <Routes>
          <Route
            path="/borrarDisponibilidad"
            element={<BorrarDisponibilidad />}
          />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
