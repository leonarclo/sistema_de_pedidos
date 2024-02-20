import { Route, Routes } from "react-router-dom";
import Dashboard from "./screens/Dashboard";
import Login from "./screens/auth/Login";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<Login />}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}

export default MainRoutes;
