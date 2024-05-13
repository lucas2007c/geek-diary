import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient();

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

export default { getAll, getById, getByEmail, create, update, remove }