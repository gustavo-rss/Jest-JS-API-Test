const request = require('supertest');
const rota = "http://localhost:3000";

// Test suite for the users API
describe('Suite de testes da API users', () => {

    // JSON object for user registration
    const json_arquivo_cadastro_usuario = {
        "nome": "Teste 4",
        "telefone": "(44)99997070",
        "email": "teste4@gmail.com",
        "senha": "1234"
    }

    // Test case to query all users and expect status 200
    it('Consulta todos os usuários e deve retornar status 200', async () => {
        const response = await request(rota).get('/users');
        expect(response.status).toBe(200);
    });

    // Test case to query all activities and expect status 200
    it('Consulta todas as atividades e deve retornar status 200', async () => {
        const response = await request(rota).get('/activities');
        expect(response.status).toBe(200);
    });

    // Test case to register a new user and expect status 201
    it('Deve cadastrar um novo usuário e deve retornar 201', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
        expect(response.status).toBe(201);
    });

    // Test case to register a user that already exists in the database and expect status 422
    it('Deve cadastrar um usuário que já está na base e deve retornar 422', async () => {
        const response = await request(rota)
            .post('/users')
            .send(json_arquivo_cadastro_usuario);
        expect(response.status).toBe(422);
    });
})