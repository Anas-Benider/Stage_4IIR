import express from 'express'
import usersController from '../controller/usersController.js'
const router = express.Router();

router.post('/create', usersController.createUser);

export default router;