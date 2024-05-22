import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient();

const gameSchema = z.object({
    id: z.number({
        required_error: 'o id é obrigatório',
        invalid_type_error: 'O id deve ser um número'
    }),
    name: z.string({
        required_error: 'O nome é obrigatório',
        invalid_type_error: 'O nome deve ser uma string'
    })
        .min(1, 'O nome é obrigatório')
        .max(200, 'O nome deve ter no máximo 200 caracteres'),
    image: z.string({
        invalid_type_error: 'A imagem deve ser uma string'
    })
        .url('Url da imagem inválida').or(z.literal('')),
    notes: z.string({
        invalid_type_error: 'As notas devem ser uma string'
    })
        .max(1000, 'As anotações devem ter no máximo 1000 caracteres'),
    status: z.string({
        invalid_type_error: 'O status deve ser uma string'
    })
        .or(z.literal(null)),
    saved: z.boolean({
        invalid_type_error: 'O saved deve ser um booleano'
    })
})

const validateGameToCreate = (game) => {
    const partialGameSchema = gameSchema.partial({ id: true, image: true, notes: true, status: true, saved: true })
    return partialGameSchema.safeParse(game)
}

const validateGameToUpdate = (game) => {
    const partialGameSchema = gameSchema.partial({ id: true, name: true, image: true, notes: true, status: true, saved: true })
    return partialGameSchema.safeParse(game)
}

const getAll = async (users_id) => {
    return await prisma.games.findMany({
        orderBy: { id: 'asc' },
        where: {
            users_id
        }
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

export default { getAll, getById, create, update, remove, validateGameToCreate, validateGameToUpdate }