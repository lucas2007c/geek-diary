const request = require('supertest')
const express = require('express')

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

describe('/GET user', () => {
    const newUser = {
        id: 9999999,
        email: 'emaildeteste@gmail.com',
        pass: 'senhateste'
    }

    beforeAll(async () => {
        await request(app).post('/user').send(newUser)
    })

    afterAll(async () => {
        await request(app).delete(`/user/${newUser.id}`)
    })

    it('Deve retornar 200 e usuário', async () => {
        const response = await request(app).get(`/user`);
        expect(response.statusCode).toBe(200)
        expect(response.body.users).toBe([newUser]);
    })

    it('Deve retornar 200 e user get id', async () => {
        const response = await request(app).get(`/user/${newUser.id}`);
        expect(response.statusCode).toBe(200)
        expect(response.body.user).toBe(JSON.stringify(newUser));
    })
});

// describe('/POST user', () => {
//     it('Deve retornar 201 e user create', async () => {
//         const response = await request(app).post('/user')
//         expect(response.statusCode).toBe(201)
//         expect(response.body.msg).toBe('USER CREATE')
//     })
// })

// describe('/PUT user', () => {
//     it('Deve retornar 200 e user update', async () => {
//         const response = await request(app).put(`/user/1`)
//         expect(response.statusCode).toBe(200)
//         expect(response.body.msg).toBe('USER UPDATE')
//     })
// })

// describe('/DELETE user', () => {
//     it('Deve retornar 200 e user delete', async () => {
//         const response = await request(app).delete(`/user/1`)
//         expect(response.statusCode).toBe(200)
//         expect(response.body.msg).toBe('USER DELETE')
//     })
// })