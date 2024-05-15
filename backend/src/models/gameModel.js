import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient();

const getAll = async () => {
    return await prisma.games.findMany({
        orderBy: { id: 'asc' }
    });
}

const getById = async (id, users_id) => {
    return await prisma.games.findUnique({
        where: {
            id_users_id: {
                id: id,
                users_id: users_id
            }
        },
    });
}

const create = async (game) => {
    return await prisma.games.create({
        data: game
    })
}

const update = async (id, users_id, game) => {
    return await prisma.games.update({
        where: {
            id_users_id: {
                id: id,
                users_id: users_id
            }
        },
        data: game
    })
}

const remove = async (id, users_id) => {
    return await prisma.games.delete({
        where: {
            id_users_id: {
                id: id,
                users_id: users_id
            }
        },
    })
}

export default { getAll, getById, create, update, remove }