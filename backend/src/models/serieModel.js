import { PrismaClient } from '@prisma/client'
import { z } from 'zod'
const prisma = new PrismaClient();

const serieSchema = z.object({
    id: z.number({
        required_error: 'o id é obrigatório',
        invalid_type_error: 'O id deve ser um número'
    }),
    name: z.string({
        required_error: 'O nome é obrigatório',
        invalid_type_error: 'O nome deve ser uma string'
    })
        .max(200, 'O nome deve ter no máximo 200 caracteres'),
    image: z.string({
        invalid_type_error: 'A imagem deve ser uma string'
    })
        .url('Url da imagem inválida').or(z.literal('')),
    notes: z.string({
        invalid_type_error: 'As notas devem ser uma string'
    })
        .max(1000, 'As anotações devem ter no máximo 1000 caracteres'),
    last_ep: z.string({
        invalid_type_error: 'O ultimo ep deve ser uma string'
    })
        .max(50, 'O ultimo ep deve ter no máximo 50 caracteres').or(z.literal('')),
    status: z.string({
        invalid_type_error: 'O status deve ser uma string'
    })
        .or(z.literal(null))
})

const validateSerieToCreate = (serie) => {
    const partialSerieSchema = serieSchema.partial({ id: true, image: true, notes: true, last_ep: true, status: true })
    return partialSerieSchema.safeParse(serie)
}

const validateSerieToUpdate = (serie) => {
    const partialSerieSchema = serieSchema.partial({ id: true, name: true, image: true, notes: true, last_ep: true, status: true })
    return partialSerieSchema.safeParse(serie)
}

const getAll = async (users_id) => {
    return await prisma.series.findMany({
        orderBy: { id: 'asc' },
        where: {
            users_id
        }
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

export default { getAll, getById, create, update, remove, validateSerieToCreate, validateSerieToUpdate }