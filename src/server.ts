import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import { Usuario } from "../models/Usuario";

mongoose.connect("mongodb+srv://thyaguixx:apithy2024@api-4desk.9q9ww5g.mongodb.net/?retryWrites=true&w=majority")

const app = express()
app.use(cors())
app.use(express.json())


app.post('/cadastro', async (req, res) => {
    const usuario = new Usuario({
        nome: req.body.nome,
        idade: req.body.idade
    })

    await usuario.save()    //Salvar no banco (JSON)
    res.send({msg: "Cadastrou essa porra vai curintia"})

})

app.get('/listar', async (req, res) => {
    const usuarioLista = await Usuario.find()   //Traz uma lista de usuários que ele achar no JSON
    res.send(usuarioLista)
})

app.listen(3001, () => {
    console.log("Rodando");
})