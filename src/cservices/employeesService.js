import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient()

const getAll = async () => {
    const employees = await prisma.employee.findMany({
        select:{
            matricule: true,
            departement: true,
            user:{
                select:{
                    firstName:true,
                    lastName: true,
                    cin: true,
                    email: true,
                    dateNaissance: true,
                    title: true,
                    password: true
                }
            }
        }
    })
    return employees;
}

const getSingleEmployeeDataByUserId = async (userId) => {
    const user = await prisma.user.findUnique({
        where:{
            id: userId
        },
        include:{
            employe:{
                include:{
                    tasks:true,
                    departement:true,
                }
            }
        }
    })
    return user
}

const createEmployee = async(
    title,
    CIN,
    firstName,
    lastName,
    email,
    naiss,
    password
) => {
    try {
        const user = await prisma.user.create({
            data:{
                title: title,
                cin: CIN,
                firstName: firstName,
                lastName: lastName,
                email: email,
                dateNaissance: naiss,
                password: password
            }
        })
        const employee = await prisma.employee.create({
            data:{
                user:{
                    connect:{
                        id: user.id
                    }
                }
            }
        })
        console.log(employee);
        return employee;    
    } catch (err) {
     throw err;
    }
}

const updateEmployee = async (data) => {
    try {
        const employee = await prisma.employee.update({
            where:{
                matricule: data.matricule
            },
            data:{
                user:{
                    update:{
                        title: data.title,
                        cin: data.cin,
                        firstName: data.firstName,
                        lastName: data.lastName,
                        email: data.email,
                        dateNaissance: data.dateNaissance,
                        password: data.password
                    }
                }
            }
        })
        return employee;    
    } catch (err) {
        throw err;
    }
}

//explain: Selects all the employees that are not chefs
const taskSelectEmployees = async () => {
    const employees = await prisma.employee.findMany({
        where:{
            chefOf: null,
        },
        select:{
            matricule: true,
            departement: true,
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


const detachFromDep = async (matricule) => {
    const modifiedEmp = await prisma.employee.update({
        where:{
            matricule: matricule
        },
        data:{
            departement:{
                disconnect: true
            }
        }
    })
    return modifiedEmp;
}


const deleteEmployee = async (matricule) => {
    try {
        const deletedEmp = await prisma.employee.delete({
            where:{
                matricule: matricule
            }
        })
        const deleteUser = await prisma.user.delete({
            where:{
                id: deletedEmp.userId
            }
        })
        
        return deletedEmp;    
    } catch (err) {
        throw err;
    }
}

export default {
    getAll,
    getSingleEmployeeDataByUserId,
    createEmployee,
    updateEmployee,
    taskSelectEmployees,
    detachFromDep,
    deleteEmployee
}