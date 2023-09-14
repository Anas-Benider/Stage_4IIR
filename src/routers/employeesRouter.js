import express from 'express'
import employeesController from '../controller/employeesController.js'
const router = express.Router();

router.get('/task-select', employeesController.getEmployeesForTaskSelect);
router.post('/create', employeesController.createEmployee);
export default router;