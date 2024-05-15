const request = require('supertest')
const express = require('express')
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const app = express();

import getById from '../src/controllers/serie/getById.js';
import listAll from '../src/controllers/serie/listAll.js';
import create from '../src/controllers/serie/create.js';
import update from '../src/controllers/serie/update.js';
import remove from '../src/controllers/serie/remove.js';

import getByIdUser from '../src/controllers/user/getById.js';
import listAllUser from '../src/controllers/user/listAll.js';
import createUser from '../src/controllers/user/create.js';
import updateUser from '../src/controllers/user/update.js';
import removeUser from '../src/controllers/user/remove.js';
import prismaDateFormat from '../src/middlewares/prismaDateFormat.js';

app.use(express.json());
app.use(prismaDateFormat)

app.get('/serie', listAll);
app.get('/serie/:id/:userID', getById);
app.post('/serie', create);
app.put('/serie/:id/:userID', update);
app.delete('/serie/:id/:userID', remove);

app.get('/user', listAllUser);
app.get('/user/:id', getByIdUser);
app.post('/user', createUser);
app.put('/user/:id', updateUser);
app.delete('/user/:id', removeUser);

const newUser = {
    id: 99,
    email: 'emaildeteste@gmail.com',
    pass: 'senhateste'
}

const newSerie = {
    id: 99,
    name: 'Jujutsu kaisen',
    image: 'http://image.url',
    notes: 'No ep x gojo derrotou hanami',
    start: '15/05/2024',
    finish: '15/05/2024',
    last_ep: 'T2 E40 - Trovão',
    status: 'Assistindo',
    users_id: newUser.id,
}

describe('/GET serie', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
        await request(app).post('/serie').send(newSerie)
    })

    afterAll(async () => {
        await request(app).delete(`/serie/${newSerie.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE series AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 200 e a série', async () => {
        const response = await request(app).get(`/serie/${newSerie.id}/${newUser.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.serie).toEqual(newSerie)
        // to equal é usado para comparar objetos e arrays diferentes
    })

    it('Deve retornar 404 e Série não encontrada', async () => {
        const response = await request(app).get(`/serie/99999999/${newUser.id}`);
        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe('Série não encontrada')
    })
});

describe('/POST serie', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
    })

    afterAll(async () => {
        await request(app).delete(`/serie/${newSerie.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE series AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 201 e série criada', async () => {
        const response = await request(app).post('/serie').send(newSerie)
        expect(response.statusCode).toBe(201)
        expect(response.body.serie).toEqual(newSerie)
    })
})

describe('/PUT serie', () => {
    const newData = {
        id: 99,
        name: 'Jujutsu kaisen',
        image: 'http://image.url',
        notes: 'No ep x gojo derrotou hanami',
        start: '15/05/2024',
        finish: '15/05/2024',
        last_ep: 'T2 E42 - Certo e errado',
        status: 'Assistindo',
        users_id: newUser.id,
    }

    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
        await request(app).post('/serie').send(newSerie)
    })

    afterAll(async () => {
        await request(app).delete(`/serie/${newSerie.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE series AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 200 e a série atualizada', async () => {
        const response = await request(app).put(`/serie/${newSerie.id}/${newUser.id}`).send(newData)
        expect(response.statusCode).toBe(200)
        expect(response.body.serie).toEqual({ id: newSerie.id, ...newData })
    })

    it('Deve retornar 404 e Série não encontrada', async () => {
        const response = await request(app).put(`/serie/99999999/${newUser.id}`);
        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe('Série não encontrada')
    })
})

describe('/DELETE serie', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
        await request(app).post('/serie').send(newSerie)
    })

    afterAll(async () => {
        await request(app).delete(`/serie/${newSerie.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE series AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 200 e a série deletada', async () => {
        const response = await request(app).delete(`/serie/${newSerie.id}/${newUser.id}`)
        expect(response.body.serie).toEqual(newSerie)
        expect(response.statusCode).toBe(200)
    })

    it('Deve retornar 404 e Série não encontrada', async () => {
        const response = await request(app).delete(`/serie/99999999/${newUser.id}`);
        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe('Série não encontrada')
    })
})