import { PrismaClient } from "@prisma/client"
const prisma = new PrismaClient();

const createUser = async (req, res) => {
    const {cin,title,firstName, lastName, email, password, naiss} = req.body
    const user = await prisma.user.create({
        data:{
            cin,
            dateNaissance: naiss,
            email,
            firstName,
            lastName,
            password,
            title,
        }
    })

    return res.status(201).json(user)
} 

export default {
    createUser
}