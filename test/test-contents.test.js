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
    
    it('CT01 - Cadastrar conteúdo e retornar 201', async () => {
        const response = await request(rotaConteudo)
            .post('/conteudos')
            .send(payload_conteudo);

        console.log('Conteúdo adicionado: ', response.body);

        //validating received values
        const{id, titulo, descricao, tipoConteudo, conteudo, dataCadastro} = response.body;
        idConteudo = response.body.id;
        dataCadastroConteudo = response.body.dataCadastro;

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

    it('CT02 - Buscar conteúdo e retornar 200', async () => {
        const response = await request(rotaConteudo)
            .get(`/conteudos/${idConteudo}`);

        console.log('Conteúdo retornado: ', response.body)

        //validating status code
        expect(response.status).toBe(200);

        //validating received values
        const{id, titulo, descricao, tipoConteudo, conteudo, dataCadastro} = response.body;
        
        //validating sent vs received value
        expect(id).toBe(idConteudo);
        expect(titulo).toBe(payload_conteudo.titulo);
        expect(descricao).toBe(payload_conteudo.descricao);
        expect(tipoConteudo).toBe(payload_conteudo.tipoConteudo);
        expect(conteudo).toBe(payload_conteudo.conteudo);
        expect(dataCadastro).toBe(dataCadastroConteudo);
    });

    it('CT03 - Atualizar conteúdo e retornar 201', async () => {
        
        const updateConteudo_payload = Object.assign({}, payload_conteudo, {
            ['titulo']: 'Raças de Felinos' 
        });
        
        const response = await request(rotaConteudo)
            .put(`/conteudos/${idConteudo}`)
            .send(updateConteudo_payload);

        console.log('Conteúdo retornado: ', response.body)

        //validating status code
        expect(response.status).toBe(201);

        //validating received values
        const{id, titulo, descricao, tipoConteudo, conteudo} = response.body;
        
        //validating sent vs received value
        expect(id).toBe(idConteudo);
        expect(titulo).toBe(updateConteudo_payload.titulo);
        expect(descricao).toBe(updateConteudo_payload.descricao);
        expect(tipoConteudo).toBe(updateConteudo_payload.tipoConteudo);
        expect(conteudo).toBe(updateConteudo_payload.conteudo);
    });
    
}) 
