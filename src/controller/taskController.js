import employeesService from "../cservices/employeesService.js";
import tasksService from "../cservices/tasksService.js";

const getTaskPage = async (req,res) =>{
    const tasks = await tasksService.getAllTasks();
    const employees = await employeesService.taskSelectEmployees();

    return res.status(200).json({tasks, employees});
}

const createTask = async (req,res) => {
    const {label, selectedEmployees, description} = req.body;
    const task = await tasksService.createTask(label, selectedEmployees, description);
    return res.status(201).json(task)
}


const deleteTaskById = async (req, res) => {
    const {taskId} = req.body;
    const task = await tasksService.deleteTaskById(taskId);
    return res.status(200).json(task)
}

const removeEmployee = async (req, res) => {
    try {
        const {empId, taskId} = req.body;
        const updatedTask = await tasksService.removeEmployee(taskId, empId);
        return res.status(200).json(updatedTask)
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