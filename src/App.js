import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./jsx/login";
import DogSearch from "./jsx/DogSearch";
import "./style/App.css";
import "bootstrap/dist/css/bootstrap.min.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/search" element={<DogSearch />} />
      </Routes>
    </Router>
  );
}

export default App;
