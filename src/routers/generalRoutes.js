import express from 'express'
import genController from '../controller/generalController.js'
const router = express.Router();

router.get('/', genController.home);
router.get('/testSelect', genController.testSelect);

export default router;