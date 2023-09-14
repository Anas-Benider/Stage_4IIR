import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const taskSelectEmployees = async () => {
    const employees = await prisma.employee.findMany({
        where:{
            isChefDepartement: false,
            //departementId: 
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