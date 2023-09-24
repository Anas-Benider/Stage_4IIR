import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

//explain: Selects all the employees that are not chefs
const taskSelectEmployees = async () => {
    const employees = await prisma.employee.findMany({
        where:{
            chefOf: null,
        },
        select:{
            matricule: true,
            user:{
                select:{
                    firstName:true,
                    lastName: true
                }
            }
        }
    })
    return employees;
}

export default {
    taskSelectEmployees
}