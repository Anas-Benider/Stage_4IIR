import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const CheckUser = async (email, password) => {
    try {
        const user = await prisma.user.findFirst({
            where: {
                email: email,
            },
            include:{
                admin: {
                    select:{
                        id: true,
                    }
                },
                employe:{
                    select:{
                        matricule: true,
                        chefOf: true,
                    }
                }
            }

        })
        console.log(user);
        if(!user){
            throw {
                status: 404,
                msg : 'Aucun utilisateur ne correspond à cet email'
            }
        }
        else if(user.password !== password){
            throw {
                status: 404,
                msg : 'Mot de passe incorrect'
            }
        }
        else{
            return user;
        }       
    } catch (err) {
        throw err;
    }
}

export default {
    CheckUser
}