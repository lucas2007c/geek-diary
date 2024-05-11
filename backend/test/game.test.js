const request = require('supertest')
const express = require('express')

const app = express();

import getById from '../src/controllers/game/getById.js';
import listAll from '../src/controllers/game/listAll.js';
import create from '../src/controllers/game/create.js';
import update from '../src/controllers/game/update.js';
import remove from '../src/controllers/game/remove.js';

app.use(express.json());

app.get('/game', listAll);
app.get('/game/:id', getById);
app.post('/game', create);
app.put('/game/:id', update);
app.delete('/game/:id', remove);

describe('/GET GAME', () => {
    it('Deve retornar 200 e games list all', async () => {
        const response = await request(app).get(`/game`);
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('GAMES LIST ALL');
    })

    it('Deve retornar 200 e games get id', async () => {
        const response = await request(app).get(`/game/1`);
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('GAMES GET ID');
    })
});

describe('/POST GAME', () => {
    it('Deve retornar 201 e games create', async () => {
        const response = await request(app).post('/game')
        expect(response.statusCode).toBe(201)
        expect(response.body.msg).toBe('GAMES CREATE')
    })
})

describe('/PUT GAME', () => {
    it('Deve retornar 200 e games update', async () => {
        const response = await request(app).put(`/game/1`)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('GAMES UPDATE')
    })
})

describe('/DELETE GAME', () => {
    it('Deve retornar 200 e games delete', async () => {
        const response = await request(app).delete(`/game/1`)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('GAMES DELETE')
    })
})