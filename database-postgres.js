import { randomUUID } from "node:crypto";
import { sql } from './db.js'

export default class Acougue{

    async create(prato){
        const id = randomUUID()
        const {corte, nome, porcao, tempo, ingredientes, receita} = prato

        await sql `INSERT INTO receitas (id, corte, nome, porcao, tempo, ingredientes, receita) VALUES (${id}, ${corte}, ${nome}, ${porcao}, ${tempo}, ${ingredientes}, ${receita})`
    }

    async listAll(search){
        let receitas


        if(search){
            receitas  = await sql`SELECT * FROM receitas WHERE nome ilike ${'%' + search + '%'}`
        } else{
            receitas = await sql `SELECT * FROM receitas`
        }


        return receitas
    }

    async listCorte(corte){
        let infoCorte
        
        infoCorte = await sql `SELECT * FROM receitas WHERE corte = ${corte}`

        return infoCorte
    }
}