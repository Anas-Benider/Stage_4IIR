import { PrismaClient } from "@prisma/client";
import employeesService from "../cservices/employeesService.js";
const prisma = new PrismaClient();

const getTaskPage = async (req,res) =>{
    const tasks = await prisma.task.findMany()
    const employees = await employeesService.taskSelectEmployees();
    return res.render('tasks',{tasks,employees})
}

const createTask = async (req,res) => {
    const {label} = req.body;

    const task = await prisma.task.create({
        data:{
            label
        },
        include:{
            departement:true,
            employees:true
        }
    })

    return res.render('tasks');
}

export default {
    getTaskPage,
    createTask
}