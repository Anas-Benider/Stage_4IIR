import express from 'express'
import genController from '../controller/generalController.js'
const router = express.Router();

router.get('/', genController.home);
router.post('/login', genController.login);
export default router;