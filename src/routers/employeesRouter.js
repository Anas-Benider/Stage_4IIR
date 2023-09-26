import express from 'express'
import employeesController from '../controller/employeesController.js'
const router = express.Router();

router.get('/', employeesController.getEmployees);
router.get('/getAllData', employeesController.getSingleEmployeeData);
router.get('/task-select', employeesController.getEmployeesForTaskSelect);
router.post('/create', employeesController.createEmployee);
router.patch('/update', employeesController.updateEmployee);
router.put('/detachFromDep', employeesController.detachFromDep);
router.delete('/delete', employeesController.deleteEmployee);
export default router;