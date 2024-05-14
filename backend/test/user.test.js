const request = require('supertest')
const express = require('express')
import { PrismaClient } from '@prisma/client'
const prisma = new PrismaClient();

const app = express();

import getById from '../src/controllers/user/getById.js';
import listAll from '../src/controllers/user/listAll.js';
import create from '../src/controllers/user/create.js';
import update from '../src/controllers/user/update.js';
import remove from '../src/controllers/user/remove.js';

app.use(express.json());

app.get('/user', listAll);
app.get('/user/:id', getById);
app.post('/user', create);
app.put('/user/:id', update);
app.delete('/user/:id', remove);

const newUser = {
    id: 99,
    email: 'emaildeteste@gmail.com',
    pass: 'senhateste'
}

describe('/GET user', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
    })

    afterAll(async () => {
        await request(app).delete(`/user/${newUser.id}`)
    })

    it('Deve retornar 200 e o usuário', async () => {
        const response = await request(app).get(`/user/${newUser.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.user).toEqual(newUser)
        // to equal é usado para comparar objetos e arrays diferentes
    })
});

describe('/POST user', () => {
    afterAll(async () => {
        await request(app).delete(`/user/${newUser.id}`)
    })

    it('Deve retornar 201 e o user criado', async () => {
        const response = await request(app).post('/user').send(newUser)
        expect(response.statusCode).toBe(201)
        expect(response.body.user).toEqual(newUser)
    })
})

describe('/PUT user', () => {
    const newData = {
        email: 'testeUpdate@gmail.com',
        pass: 'senhaUpdate'
    }

    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
    })

    afterAll(async () => {
        await request(app).delete(`/user/${newUser.id}`)
    })

    it('Deve retornar 200 e usuário atualizado', async () => {
        const response = await request(app).put(`/user/${newUser.id}`).send(newData)
        console.log(response.body);
        expect(response.body.user).toEqual({ id: newUser.id, ...newData })
        expect(response.statusCode).toBe(200)
    })
})

describe('/DELETE user', () => {
    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
    })

    it('Deve retornar 200 e o usuário deletado', async () => {
        const response = await request(app).delete(`/user/${newUser.id}`)
        expect(response.body.user).toEqual(newUser)
        expect(response.statusCode).toBe(200)
    })

})