import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient();

const getAll = async () => {
    return await prisma.series.findMany({
        orderBy: { id: 'asc' }
    });
}

const getById = async (id, users_id) => {
    return await prisma.series.findUnique({
        where: {
            id_users_id: {
                id: id,
                users_id: users_id
            }
        },
    });
}

const create = async (serie) => {
    return await prisma.series.create({
        data: serie
    })
}

const update = async (id, users_id, serie) => {
    return await prisma.series.update({
        where: {
            id_users_id: {
                id: id,
                users_id: users_id
            }
        },
        data: serie
    })
}

const remove = async (id, users_id) => {
    return await prisma.series.delete({
        where: {
            id_users_id: {
                id: id,
                users_id: users_id
            }
        },
    })
}

export default { getAll, getById, create, update, remove }