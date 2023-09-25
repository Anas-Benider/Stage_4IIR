import express from 'express'
import taskController from '../controller/taskController.js'

const router = express.Router();

router.get('/', taskController.getTaskPage);
router.post('/create', taskController.createTask);
router.put('/removeEmployee', taskController.removeEmployee)
router.delete('/delete', taskController.deleteTaskById)
export default router;