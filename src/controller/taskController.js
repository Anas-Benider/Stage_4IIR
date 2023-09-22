import { PrismaClient } from "@prisma/client";
import session from "express-session";
import employeesService from "../cservices/employeesService.js";
import tasksService from "../cservices/tasksService.js";
const prisma = new PrismaClient();

const getTaskPage = async (req,res) =>{
    const tasks = await tasksService.getAllTasks();
    const employees = await employeesService.taskSelectEmployees();
    const newTaskId = req.session.newTaskID;
    if(newTaskId)
    {
        const newTask = tasks.find((task)=>{
            task.id === newTaskId;
        })
        req.session.newTaskID = undefined;
    }

    return res.render('tasks',{tasks,employees})
}

const createTask = async (req,res) => {
    const {label, employees: employeesIds, description} = req.body;
    const task = await tasksService.createTask(label, employeesIds, description);
    req.session.newTaskID = task.id;
    res.redirect('/task');
}


const deleteTaskById = async (req, res) => {
    const {taskId} = req.body;
    const task = await tasksService.deleteTaskById(taskId);
    req.session.msg = "La tâche "+task.label+" est supprimée avec succès"
    res.redirect('/task');
}

const removeEmployee = async (req, res) => {
    try {
        const {taskId, employeeMatricule} = req.body;
        console.log(taskId,employeeMatricule);
        const updatedTask = await tasksService.removeEmployee(taskId, employeeMatricule);
        res.redirect('/task');    
    } catch (err) {
        console.error(err);
    }
}

export default {
    getTaskPage,
    createTask,
    deleteTaskById,
    removeEmployee
}