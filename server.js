import fastify from 'fastify'
import Acougue from './database-postgres.js'

const dbRules = new Acougue()

const server = fastify()

server.post("/carnes", async(req, res)=>{
    const {corte, nome, porcao, tempo, ingredientes, receita} = req.body

    await dbRules.create({
        corte,
        nome,
        porcao,
        tempo,
        ingredientes,
        receita
    })

    return res.status(200).send()
})

server.get("/cortes/:corte", async(req)=>{
    const corte = req.params.corte
    const receitas = await dbRules.listCorte(corte)

    return receitas
})

server.get("/receitas", async(req)=>{
    const search = req.query.search
    const receitas = await dbRules.listAll(search)

    return receitas
})

server.listen({
    port:process.env.PORT ?? 8080,
})