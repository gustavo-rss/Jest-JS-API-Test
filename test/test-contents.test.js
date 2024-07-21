const request = require('supertest');
const { faker } = require('@faker-js/faker');
const rotaConteudo = "http://localhost:3000";

describe('Suite de testes CRUD da API de conteúdos', () => {

    const payload_conteudo = {
        titulo: 'Raças de Gatos',
        descricao: faker.animal.cat(),
        tipoConteudo: 'Texto',
        conteudo: faker.lorem.words()
    }

    console.log(payload_conteudo);
    
    it('CT01 - Cadastro de conteúdo e retorno 201', async () => {
        const response = await request(rotaConteudo)
            .post('/conteudos')
            .send(payload_conteudo);

        console.log(response.body);

        //validating received values
        const{id, titulo, descricao, tipoConteudo, conteudo, dataCadastro} = response.body;

        //validating status code
        expect(response.status).toBe(201);
        
        //validating presence
        expect(id).toBeDefined();
        expect(dataCadastro).toBeDefined();

        //validating sent vs received value
        expect(titulo).toBe(payload_conteudo.titulo);
        expect(descricao).toBe(payload_conteudo.descricao);
        expect(tipoConteudo).toBe(payload_conteudo.tipoConteudo);
        expect(conteudo).toBe(payload_conteudo.conteudo);
        

    })
    
}) 
