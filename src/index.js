import express from 'express';
import dotenv from 'dotenv';
import generalRouter from './routes/generalRoutes.js';

const app = express();
dotenv.config()
app.set('views', './src/views');
app.set('view engine', 'ejs');
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(express.static('./public'));
app.use(generalRouter)

app.listen(process.env.PORT, ()=>{
    console.log('connected to port '+process.env.PORT);
})