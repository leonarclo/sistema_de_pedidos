import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/Login";
import Usuarios from "./screens/Usuarios";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
      <Route path="/usuarios" element={<Usuarios />}></Route>
    </Routes>
  );
}

export default MainRoutes;
