const request = require('supertest')
const express = require('express')
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const app = express();

import getById from '../src/controllers/game/getById.js';
import listAll from '../src/controllers/game/listAll.js';
import create from '../src/controllers/game/create.js';
import update from '../src/controllers/game/update.js';
import remove from '../src/controllers/game/remove.js';

import getByIdUser from '../src/controllers/user/getById.js';
import listAllUser from '../src/controllers/user/listAll.js';
import createUser from '../src/controllers/user/create.js';
import updateUser from '../src/controllers/user/update.js';
import removeUser from '../src/controllers/user/remove.js';

app.use(express.json());

app.get('/game', listAll);
app.get('/game/:id/:userID', getById);
app.post('/game', create);
app.put('/game/:id/:userID', update);
app.delete('/game/:id/:userID', remove);

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

const newGame = {
    id: 99,
    name: 'God of war',
    image: 'http://image.url',
    notes: 'Cabeça da medusa é boa contra os minotauros',
    start: '2024-05-15T00:00:00.000Z',
    finish: '2024-05-15T00:00:00.000Z',
    platinum: '2024-05-15T00:00:00.000Z',
    status: 'Platinado',
    users_id: newUser.id,
}

describe('/GET game', () => {
    beforeAll(async () => {
        const response = await request(app).post('/user').send(newUser)
        await request(app).post('/game').send(newGame)
    })

    afterAll(async () => {
        await request(app).delete(`/game/${newGame.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE games AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 200 e o Jogo', async () => {
        const response = await request(app).get(`/game/${newGame.id}/${newUser.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.game).toEqual(newGame)
        // to equal é usado para comparar objetos e arrays diferentes
    })

    it('Deve retornar 404 e Jogo não encontrado', async () => {
        const response = await request(app).get(`/game/99999999/${newUser.id}`);
        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe('Jogo não encontrado')
    })
});

describe('/POST game', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
    })

    afterAll(async () => {
        await request(app).delete(`/game/${newGame.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE games AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 201 e o jogo criado', async () => {
        const response = await request(app).post('/game').send(newGame)
        expect(response.statusCode).toBe(201)
        expect(response.body.game).toEqual(newGame)
    })
})

describe('/PUT game', () => {
    const newData = {
        id: 99,
        name: 'God of war',
        image: 'http://image.url2',
        notes: 'Cabeça da medusa é boa contra os minotauros e ogros',
        start: '2024-05-15T00:00:00.000Z',
        finish: '2024-05-15T00:00:00.000Z',
        platinum: '2024-05-15T00:00:00.000Z',
        status: 'Platinado',
        users_id: newUser.id,
    }

    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
        await request(app).post('/game').send(newGame)
    })

    afterAll(async () => {
        await request(app).delete(`/game/${newGame.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE games AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 200 e Jogo atualizado', async () => {
        const response = await request(app).put(`/game/${newGame.id}/${newUser.id}`).send(newData)
        expect(response.statusCode).toBe(200)
        expect(response.body.game).toEqual({ id: newGame.id, ...newData })
    })

    it('Deve retornar 404 e Jogo não encontrado', async () => {
        const response = await request(app).put(`/game/99999999/${newUser.id}`);
        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe('Jogo não encontrado')
    })
})

describe('/DELETE game', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
        await request(app).post('/game').send(newGame)
    })

    afterAll(async () => {
        await request(app).delete(`/game/${newGame.id}/${newUser.id}`)
        await request(app).delete(`/user/${newUser.id}`)
        await prisma.$executeRaw`ALTER TABLE games AUTO_INCREMENT = 1;`
        await prisma.$executeRaw`ALTER TABLE users AUTO_INCREMENT = 1;`
    })

    it('Deve retornar 200 e o Jogo deletado', async () => {
        const response = await request(app).delete(`/game/${newGame.id}/${newUser.id}`)
        expect(response.body.game).toEqual(newGame)
        expect(response.statusCode).toBe(200)
    })

    it('Deve retornar 404 e Jogo não encontrado', async () => {
        const response = await request(app).delete(`/game/99999999/${newUser.id}`);
        expect(response.statusCode).toBe(404)
        expect(response.body.msg).toBe('Jogo não encontrado')
    })
})