// Database em memoria criado afins de aprendizado simplificado 
import { randomUUID } from 'node:crypto';  // para criar IDs

export class DatabaseMemory {
    // #videos = []; // um array protegido para armazenar meus videos.
    // Podemos utilizar funções como, set, map, em vez de utilizar apenas um array vazio, set e map não aceitam valores duplicados, ou seja não pode adicionar duas vezes o mesmo video e etc.. o video tera um id
    #videos = new Map()

    
    // MÉTODOS DE MANIPULAÇÃO DE VIDEOS
    list() {
        return Array.from(this.#videos.entries())  // array.from converte uma estrutura de dados que não é um array, para um array 
    }

    create(video) {
        const videoId = randomUUID() // Universar Unique ID

        // this.#videos.push(video); // adicionar um video no meu array videos, porém não utilizarei o metodo push porque ele não existe no Map()
        this.#videos.set(videoId, video); // set tem a mesma função do push dentro do Map(), porém ele recebe dois parametros a chave e as informações
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.set(id);
    }

}