import { Routes, Route } from "react-router-dom";
import Dashboard from "./views/dashboard";

function MainRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Dashboard />}></Route>
      <Route path="/login" element={<h1>Página de Login</h1>}></Route>
      <Route path="/dashboard" element={<Dashboard />}></Route>
    </Routes>
  );
}
export default MainRoutes;
