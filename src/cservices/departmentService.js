import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

const getAll = async () => {
    try {
        const deps = await prisma.departement.findMany({
            include: {
                employees: {
                    select: {
                        matricule: true,
                        user: {
                            select: {
                                title: true,
                                firstName: true,
                                lastName: true,
                                email: true,
                            }
                        }
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
                chef: {
                    connect: {
                        matricule: chefId
                    }
                },
                employees: {
                    connect: employeesIds
                }
            }
        });
        return department;
    } catch (err) {
        throw err;
    }
}

const remove = async (id) => {
    console.log(id);
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
    remove
}