import departmentService from "../cservices/departmentService.js";
import employeesService from "../cservices/employeesService.js";

const getAll = async (req, res) => {
  //gets All deps
  const departments = await departmentService.getAll();
  //gets all employees
  const employees = await employeesService.taskSelectEmployees();
  const allEmployees = await employeesService.getAll();
  return res.status(200).json({ departments, employees, allEmployees });
};

const create = async (req, res) => {
  let { label, chef, employees } = req.body;
  employees = employees.map((emp) => ({ matricule: emp }));
  const department = await departmentService.create(label, chef, employees);
  return res.status(201).json({ department });
};

const changeChef = async (req, res) => {
  const { newChef, depId } = req.body;
  const department = await departmentService.changeChef(newChef, depId);
  return res.status(201).json({ department });
};

const update = async (req, res) => {
  const { depId, label, chefId, emps } = req.body;
  const department = await departmentService.update(depId, label, chefId, emps );
  return res.status(201).json({ department });
};

const remove = async (req, res) => {
  const { id } = req.body;
  const department = await departmentService.remove(id);
  return res.status(201).json({ department });
};

export default {
  getAll,
  create,
  changeChef,
  update,
  remove,
};
