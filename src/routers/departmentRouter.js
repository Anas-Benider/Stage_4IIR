import express from 'express'
import departmentController from '../controller/departmentController.js'
const router = express.Router();

router.get('/', departmentController.getAll);
router.post('/create', departmentController.create);
// router.post('/update', departmentController.update);
router.post('/remove', departmentController.remove);
export default router;