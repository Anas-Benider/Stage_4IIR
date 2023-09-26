import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAll = async () => {
    try {
        const deps = await prisma.departement.findMany({
            include: {
                withChef:{
                    select:{
                        chef:{
                            select:{
                                matricule: true,
                                user: true
                            }
                        }                            
                    }
                },
                employees: {
                    where:{
                        chefOf: null                           
                    }, 
                    select: {
                        matricule: true,
                        user: true
                    }
                }
            }
        });
        return deps;
    } catch (err) {
        throw err;
    }
}

const create = async (label, chefId, employeesIds) => {
    try {
        const department = await prisma.departement.create({
            data: {
                label,
                employees: {
                    connect: employeesIds
                }
            }
        });
        const chefRelation = await prisma.chefDepartement.create({
            data: {
                departement: {
                    connect: {
                        id: department.id
                    }
                },
                chef: {
                    connect: {
                        matricule: chefId
                    }
                }
            }
        })

        const ActiveDep = await prisma.departement.update({
            where: {
                id: department.id
            },
            data: {
                withChef: {
                    connect: {
                        id: chefRelation.id
                    }
                }
            }
        })

        return ActiveDep;
    } catch (err) {
        throw err;
    }
}

const changeChef = async (newChef, depId) => {
    const changeDepChef = await prisma.chefDepartement.update({
        where:{
            departementId: depId
        },
        data:{
            chef:{
                connect:{
                    matricule: newChef
                }
            }
        }
    })
    return changeDepChef;
}

const update = async (depId, label, chefId, emps) => {
    if(chefId)
    {
        await changeChef(chefId, depId);
    }
    const employees = emps.map(emp => ({matricule: emp}))
    console.log(employees);
    const department = await prisma.departement.update({
        where:{
            id: depId
        },
        data:{
            label,
            employees:{
                set: employees
            }
        }
    })
    return department;
}

const remove = async (id) => {
    await prisma.chefDepartement.delete({
        where:{
            departementId: id
        }
    })

    const dep = await prisma.departement.delete({
        where:{
            id: id
        }
    })
    return dep; 
}

export default {
    getAll,
    create,
    changeChef,
    update,
    remove
}