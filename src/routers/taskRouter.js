import express from 'express'
import taskController from '../controller/taskController.js'

const router = express.Router();

router.get('/', taskController.getTaskPage);
router.post('/create', taskController.createTask);
router.post('/delete', taskController.deleteTaskById)
router.post('/removeEmployee', taskController.removeEmployee)
export default router;