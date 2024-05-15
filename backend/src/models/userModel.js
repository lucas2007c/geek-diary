import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient();

const userSchema = z.object({
    id: z.number({
        required_error: 'o id é obrigatório',
        invalid_type_error: 'O id deve ser um número'
    }),
    email: z.string({
        required_error: 'O email é obrigatório',
        invalid_type_error: 'O email deve ser uma string'
    })
        .email('Email inválido')
        .max(200, 'O email deve ter no máximo 200 caracteres'),
    pass: z.string({
        required_error: 'A senha é obrigatória',
        invalid_type_error: 'A senha deve ser uma string'
    })
        .min(6, 'A senha deve ter no mínimo 6 caracteres'),
})

const validateUserToCreate = (user) => {
    const partialUserSchema = userSchema.partial({ id: true })
    return partialUserSchema.safeParse(user)
}

const validateUserToUpdate = (user) => {
    const partialUserSchema = userSchema.partial({ id: true, pass: true })
    return partialUserSchema.safeParse(user)
}

const getAll = async () => {
    return await prisma.users.findMany({
        orderBy: { id: 'asc' }
    });
}

const getById = async (id) => {
    return await prisma.users.findUnique({
        where: {
            id
        }
    });
}

const getByEmail = async (email) => {
    return await prisma.users.findUnique({
        where: {
            email
        },
    });
}

const create = async (user) => {
    return await prisma.users.create({
        data: user
    })
}

const update = async (id, user) => {
    return await prisma.users.update({
        where: {
            id
        },
        data: user
    })
}

const remove = async (id) => {
    return await prisma.users.delete({
        where: {
            id
        }
    })
}

export default { getAll, getById, getByEmail, create, update, remove, validateUserToCreate, validateUserToUpdate }