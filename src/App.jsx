import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Dashboard from "./pages/dashboard";
import Notification from "./pages/notification";
import "./assets/style.css";

function App() {
  return (
    <BrowserRouter>
      <div
        style={{
          padding: "15px",
          background: "#222",
        }}
      >
        <Link
          to="/"
          style={{
            color: "white",
            marginRight: "20px",
            textDecoration: "none",
          }}
        >
          Dashboard
        </Link>

        <Link
          to="/types"
          style={{
            color: "white",
            textDecoration: "none",
          }}
        >
          Notification Types
        </Link>
      </div>

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/types" element={<Notification />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;