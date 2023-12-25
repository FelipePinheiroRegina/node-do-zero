import { sql } from './db.js'
import { randomUUID } from 'node:crypto'

export class DatabasePostgres {
    async list(search) {  // Eu só posso usar o await quando minha função for async
        let videos

        if (search) {
            videos = await sql `SELECT * FROM videos WHERE title ILIKE ${'%' + search + '%'}`
        } else {
            videos = await sql `SELECT * FROM videos`
        }

        return videos
    }
        
             
    async create(videos) {
        const videoId = randomUUID()
        const { title, description, duration } = videos

        await sql `INSERT INTO videos(id, title, description, duration) VALUES(${videoId}, ${title}, ${description}, ${duration})`
    }

    async update(id, videos) {
       const { title, description, duration } = videos

       await sql`UPDATE videos SET title = ${title}, description = ${description}, duration = ${duration} WHERE id = ${id}`
    }

    async delete(id) {
        await sql`DELETE FROM videos WHERE id = ${id}`
    }

    
}



