/*
import { createServer } from 'node:http';  //Função mais importante da criação de APIs'. Essa sintaxe é a mais recente do node, sendo assim preciso criar um packge json - comando no terminal -> npm init -y

const server = createServer((request, response) => {  // Para criar, eu chamo a função createServer passando outra função como parametro. Dentro dessa função eu posso passar os parametros request(Obter dados dos usuários), response(Responder dados para os usuários)
    response.write('Hi, I am the Felipe, i am learning NodeJS');

    return response.end();
});

// http:localhost:3333 -> Porta de acesso
server.listen(3333); // Função createServer retorna uma função listen, para colocar a porta de comunicação. Podendo assim, rodar coisas diferentes na minha maquina em paralelo, só basta mudar a porta, ou seja se a porta desse projeto é 3333, a outra devera ser diferente ex: 3332 e assim por diante.
*/

// Mini API acima foi usando recursos node:http, porém nenhuma empresa trabalha desse jeito, ela busca frameworks completos para criação de APIs, sendo assim, utilizaremos o framework FastiFy, esse framework é bem básico, porém traz os recusros necessarios para criação de uma API, ignorando bastante coisa. Já temos frameworks completos, o mais usados hoje em dia é o Express, porém usaremos o fastify para fins de aprendizado simplificado.

import  { fastify } from 'fastify';
//import { DatabaseMemory } from "./database-memory.js";
import { DatabasePostgres } from './database-postgres.js'


const server = fastify();

//const database = new DatabaseMemory();
const database = new DatabasePostgres();

// Vamos imaginar que eu quero criar uma plataforma de video, onde eu posso postar o video, pesquisar o video, atualizar o video, deletar o video. Temos rotas diferentes para cada ação. 

// Método ' post ' vamos adicionar um video.
server.post('/videos', async (request, reply) => {
    const { title, description, duration } = request.body;

    await database.create({  
        // short sintaxe, em JS quando o titulo e a variavel tem o mesmo nome da pra simplificar, para somente um parametro.
        //title: title,
        title,
        //description: description,
        description,
        //duration: duration,
        duration,
    });  // Todos post e put precisarei mandar um request body

    //console.log(database.list()); // Com esse  comando eu devo conseguir ver os videos no meu server

    return reply.status(201).send();
});

server.get('/videos', async (request) => {
    const search = request.query.search

    const videos = await database.list(search)
    
    return videos
});

server.put('/videos/:id', async (request, reply) => {  // o :id, serve para identificar o video a ser atualizado.
    const videoId = request.params.id;
    const {title, description, duration} = request.body;

    await database.update(videoId, {
        title,
        description,
        duration,
    }); 

    return reply.status(204).send();
});

server.delete('/videos/:id', async (request, reply) => {
    const videoId = request.params.id

    await database.delete(videoId)

    return reply.status(204).send()
})




// server.listen(3333) // Em vez de passar a porta direto, o fastify pede para passarmos um objeto json com a porta
server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3000,
});