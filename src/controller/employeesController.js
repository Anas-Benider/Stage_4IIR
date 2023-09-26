import employeesService from "../cservices/employeesService.js";

const getEmployees = async (req, res) => {
  const employees = await employeesService.getAll();
  return res.status(200).json(employees);
}

import jwt from 'jsonwebtoken';

const getSingleEmployeeData = async (req, res) => {
  const token = req.headers.authorization.split(' ')[1];
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  const userId = decoded.id;
  console.log(userId);
  const employee = await employeesService.getSingleEmployeeDataByUserId(userId);
  return res.status(200).json(employee);
}

const getEmployeesForTaskSelect = async (req, res) => {
  const employees = await employeesService.taskSelectEmployees();
  return res.status(200).json(employees);
};

const createEmployee = async (req, res) => {
  try {
    const { title, cin, firstName, lastName, email, dateNaissance,password } = req.body;
    const employee = await employeesService.createEmployee(
        title,
        cin,
        firstName,
        lastName,
        email,
        dateNaissance,
        password
    ); 
    return res.status(200).json(employee); //change when creating an employee page
  } catch (err) {
    return res.status(500).json(err);
  }
};

const updateEmployee = async (req, res) => {
  try {
    const data = req.body;
    console.log(data);
    const employee = await employeesService.updateEmployee(
      data
    );
    return res.status(200).json(employee);
  } catch (err) {
    return res.status(500).json(err);
  }
};

const detachFromDep = async (req, res) => {
  const { matricule } = req.body;
  const employee = await employeesService.detachFromDep(matricule);
  return res.status(200).json(employee);
};

const deleteEmployee = async (req, res) => {
  try {
    const { matricule } = req.body;
    const employee = await employeesService.deleteEmployee(matricule);
    return res.status(200).json(employee);  
  } catch (err) {
    return res.status(500).json(err);    
  }
}

export default {
  getEmployees,
  getSingleEmployeeData,
  getEmployeesForTaskSelect,
  createEmployee,
  updateEmployee,
  detachFromDep,
  deleteEmployee
};
