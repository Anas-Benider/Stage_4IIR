import { BrowserRouter, Routes, Route } from "react-router-dom";
import Tasks from "./pages/Tasks";
import Departments from "./pages/Departments";
import Employees from "./pages/Employees";
import Login from "./pages/Login";
import AdminHome from "./pages/AdminHome";
import EmployeeHome from "./pages/EmployeeHome";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Login />}/>
        <Route path="/admin" >
          <Route path="/admin/home" element={<AdminHome/>}/>
          <Route path="/admin/deps" element={<Departments />}/>
          <Route path="/admin/emps" element={<Employees/>}/>
        </Route>
        <Route path="/tasks" element={<Tasks />}/>
        <Route path="/employee/tasks" element={<EmployeeHome />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
