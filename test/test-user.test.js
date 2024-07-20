const request = require('supertest');

const rota = "http://localhost:3000";

describe('Suite de testes da API users', ()=>{
    it('Consulta todos os usuários e deve retornar status 200', async()=>{
        const response = await request(rota).get('/users');
        expect(response.status).toBe(200);
    });
})