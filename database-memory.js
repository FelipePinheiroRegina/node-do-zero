// Database em memoria criado afins de aprendizado simplificado 
import { randomUUID } from 'node:crypto';  // para criar IDs
import { title } from 'node:process';

export class DatabaseMemory {
    // #videos = []; // um array protegido para armazenar meus videos.
    // Podemos utilizar funções como, set, map, em vez de utilizar apenas um array vazio, set e map não aceitam valores duplicados, ou seja não pode adicionar duas vezes o mesmo video e etc.. o video tera um id
    #videos = new Map()

    
    // MÉTODOS DE MANIPULAÇÃO DE VIDEOS
    list(search) {
        // return Array.from(this.#videos.values())  // array.from converte uma estrutura de dados que não é um array, para um array 
        
        return Array.from(this.#videos.entries())
            .map((videoArray) => {  // Usarei o entries() no lugar do values(), pois o entries puxa o id, porém ele armazena em um array diferente dos dados, então entra a função map, para retornar um objeto com todos os dados juntos.
                const id = videoArray[0];
                const data = videoArray[1];

                return {
                    id,
                    ...data,
                };
            })
            .filter(video => {
                if (search) {
                    return video.title.includes(search)
                }

                return true
            })
    };

    create(video) {
        const videoId = randomUUID() // Universar Unique ID

        // this.#videos.push(video); // adicionar um video no meu array videos, porém não utilizarei o metodo push porque ele não existe no Map()
        this.#videos.set(videoId, video); // set tem a mesma função do push dentro do Map(), porém ele recebe dois parametros a chave e as informações
    }

    update(id, video) {
        this.#videos.set(id, video);
    }

    delete(id) {
        this.#videos.delete(id)
    }

}