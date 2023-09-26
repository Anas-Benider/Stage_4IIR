import express from 'express';
import dotenv from 'dotenv';
import generalRouter from './routers/generalRoutes.js';
import taskRouter from './routers/taskRouter.js';
import employeesRouter from './routers/employeesRouter.js';
import userRouter from './routers/usersRouter.js'
import session from 'express-session';
import { dirname } from 'path';
import { fileURLToPath } from 'url';
import departmentRouter from './routers/departmentRouter.js';
import cors from 'cors';
const app = express();

dotenv.config()
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

// Serve static files from the 'public' directory
app.use(express.static(__dirname + '/public'));
app.use(cors())

app.use(generalRouter)
app.use('/task',taskRouter)
app.use('/user',userRouter)
app.use('/employee',employeesRouter)
app.use('/deps', departmentRouter)

app.listen(process.env.PORT, ()=>{
    console.log('connected to port '+process.env.PORT);
})