import express from 'express'
import departmentController from '../controller/departmentController.js'
const router = express.Router();

router.get('/', departmentController.getAll);
router.post('/create', departmentController.create);
router.put('/changeChef', departmentController.changeChef);
router.patch('/update', departmentController.update);
router.delete('/', departmentController.remove);
export default router;