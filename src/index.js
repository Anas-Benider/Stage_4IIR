import express from 'express';
import dotenv from 'dotenv';
import generalRouter from './routes/generalRoutes.js';

const app = express();
dotenv.config()
app.use(generalRouter)

app.listen(process.env.PORT, ()=>{
    console.log('connected to port '+process.env.PORT);
})