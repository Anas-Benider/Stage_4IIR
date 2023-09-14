import { PrismaClient } from "@prisma/client"
import employeesService from  '../cservices/employeesService.js'
const prisma = new PrismaClient()

const getEmployeesForTaskSelect = async (req,res) => {
    const employees = await employeesService.taskSelectEmployees()
    return res.status(200).json(employees)
}

const createEmployee = async (req,res) => {
    const {userId, isChef} = req.body; 
    const employee = await prisma.employee.create({
        data:{
            user:{
                connect:{
                    id: userId
                }
            },
            isChefDepartement: isChef,
        }
    })
    return res.status(200).json(employee) //change when creating an employee page 
}

export default {
    getEmployeesForTaskSelect,
    createEmployee
}