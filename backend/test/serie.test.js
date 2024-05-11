const request = require('supertest')
const express = require('express')

const app = express();

import getById from '../src/controllers/serie/getById.js';
import listAll from '../src/controllers/serie/listAll.js';
import create from '../src/controllers/serie/create.js';
import update from '../src/controllers/serie/update.js';
import remove from '../src/controllers/serie/remove.js';

app.use(express.json());

app.get('/serie', listAll);
app.get('/serie/:id', getById);
app.post('/serie', create);
app.put('/serie/:id', update);
app.delete('/serie/:id', remove);

describe('/GET serie', () => {
    it('Deve retornar 200 e series list all', async () => {
        const response = await request(app).get(`/serie`);
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('SERIES LIST ALL');
    })

    it('Deve retornar 200 e series get id', async () => {
        const response = await request(app).get(`/serie/1`);
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('SERIES GET ID');
    })
});

describe('/POST serie', () => {
    it('Deve retornar 201 e series create', async () => {
        const response = await request(app).post('/serie')
        expect(response.statusCode).toBe(201)
        expect(response.body.msg).toBe('SERIES CREATE')
    })
})

describe('/PUT serie', () => {
    it('Deve retornar 200 e series update', async () => {
        const response = await request(app).put(`/serie/1`)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('SERIES UPDATE')
    })
})

describe('/DELETE serie', () => {
    it('Deve retornar 200 e series delete', async () => {
        const response = await request(app).delete(`/serie/1`)
        expect(response.statusCode).toBe(200)
        expect(response.body.msg).toBe('SERIES DELETE')
    })
})