import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/home";
import EditTurno from "./components/editTurno";

function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/edit/:id" element={<EditTurno />} exact={true} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
