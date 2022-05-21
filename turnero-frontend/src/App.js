import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import Turnos from "./pages/turnos";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
        <Routes>
          <Route path="/Turnos" element={<Turnos />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
