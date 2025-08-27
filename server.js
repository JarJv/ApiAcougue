import fastify from 'fastify'
import cors from "@fastify/cors";
import Acougue from './database-postgres.js'

const dbRules = new Acougue()

const server = fastify({
    logger: true
})

await fastify.register(cors, {
  origin: "*"
});


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

server.get("/cortes/:id", async(req)=>{
    const corte = req.params.id
    const receitas = await dbRules.listCorte(corte)

    return receitas
})

server.get("/receitas", async(req)=>{
    const search = req.query.search
    const receitas = await dbRules.listAll(search)

    return receitas
})

server.listen({
    host: '0.0.0.0',
    port:process.env.PORT ?? 8080,
})