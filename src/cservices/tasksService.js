import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient();

const createTask = async (label, ids, description) => {
    const empIds = [ids].map((id)=>{
        return {matricule: id};
    })

    const task = await prisma.task.create({
        data:{
            label,
            employees:{
                connect:empIds
            },
            description
        }
    })

    if(!task){
        //erreur
        console.log('erreur');
    }
    else{
        return task;
    }
}

const getAllTasks = async () => {
    const tasks = await prisma.task.findMany({
        include:{
            departement: true,
            employees: {
                include:{
                    user: true
                }
            }
        }
    })
    if(!tasks)
    {
        //err
    }
    else
    {
        return tasks
    }
}

const deleteTaskById = async (id) => {
    const task = await prisma.task.delete({
        where:{
            id
        }
    })
    if(!task)
    {
        //err
    }
    else
    {
        return task;
    }
}

export default {
    createTask,
    getAllTasks,
    deleteTaskById
}