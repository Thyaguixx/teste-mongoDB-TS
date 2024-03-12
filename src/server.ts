import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import { Usuario } from "../models/Usuario";
import { Produto } from "../models/Produto";
import { Servico } from "../models/Servico";

// mongoose.connect("mongodb+srv://thyaguixx:apithy2024@api-4desk.9q9ww5g.mongodb.net/?retryWrites=true&w=majority")
mongoose.connect('mongodb://localhost:27017/TestesAPI')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(err => {
        console.error('Erro de conexão com o MongoDB:', err);
    });

const app = express()
app.use(cors())
app.use(express.json())


app.post('/cadastro/:tipo', async (req, res) => {
    const { tipo } = req.params

    if (tipo == 'usuario') {
        const usuario = new Usuario({
            nome: req.body.nome,
            idade: req.body.idade
        })

        await usuario.save()    //Salvar no banco (JSON)
        res.send({msg: "Cadastrou essa porra vai curintia"})
    }
   

    // if (tipo == 'produto') {
    //     const produto = new Produto({
    //         nome: req.body.nome,
    //         preco: req.body.preco,
    //     })

    //     await produto.save()    //Salvar no banco (JSON)
    //     res.send({msg: "Cadastrou essa porra vai curintia"})
    // }

    // if (tipo == 'servico') {
    //     const servico = new Servico({
    //         nome: req.body.nome,
    //         hora: req.body.hora,
    //     })

    //     await servico.save()    //Salvar no banco (JSON)
    //     res.send({msg: "Cadastrou essa porra vai curintia"})
    // }
})

app.get('/listar', async (req, res) => {
    const usuarioLista = await Usuario.find()   //Traz uma lista de usuários que ele achar no JSON
    // const produtoLista = await Produto.find()
    // const servicoLista = await Servico.find()
    res.send({Usuarios: usuarioLista}) //, Produtos: produtoLista, Servicos: servicoLista})
})

app.listen(3001, () => {
    console.log("Rodando");
})