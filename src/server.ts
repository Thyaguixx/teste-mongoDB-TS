import mongoose from "mongoose";
import express from 'express'
import cors from 'cors'
import { Usuario } from "../models/Usuario";
import { Produto } from "../models/Produto";
import { Servico } from "../models/Servico";
import { PedidoModel, Pedido } from "../models/Pedido";
import { SETUsuario } from "../controllers/SETUsuario";

// mongoose.connect("mongodb+srv://thyaguixx:apithy2024@api-4desk.9q9ww5g.mongodb.net/?retryWrites=true&w=majority")
//     .then(() => {
//         console.log('Conectado ao MongoDB');
//     })
//     .catch(err => {
//         console.error('Erro de conexão com o MongoDB:', err);
//     });
    
//Conexão com o localhost do mongo compass lá da maquina da fatec
mongoose.connect('mongodb://localhost:27017/TestesAPI')
    .then(() => {
        console.log('Conectado ao MongoDB');
    })
    .catch(err => {
        console.error('Erro de conexão com o MongoDB:', err);
    });

// mongoose.connect('mongodb://localhost:27017/API-4Desk')
//     .then(() => {
//         console.log('Conectado ao MongoDB');
//     })
//     .catch(err => {
//         console.error('Erro de conexão com o MongoDB:', err);
//     });

const app = express()
app.use(cors())
app.use(express.json())


app.post('/cadastro/:tipo', async (req, res) => {
    const { tipo } = req.params

    if (tipo == 'usuario') {
        const dadosUsuario = {
            nome: req.body.nome,
            idade: req.body.idade
        }

        const retorno = await SETUsuario(dadosUsuario)

        if (retorno.Sucesso) {
            res.send({ msg: "Usuário cadastrado com sucesso.", Sucesso: retorno.Sucesso, retornoUsuario: retorno.Retorno })
        } else {
            res.send({ msg: "Erro ao cadastrar usuario.", erro: retorno.Erro })
        }
    }


    if (tipo == 'produto') {
        const produto = new Produto({
            nome: req.body.nome,
            preco: req.body.preco,
        })

        await produto.save()    //Salvar no banco (JSON)
        res.send({ msg: "Cadastrou essa porra vai curintia" })
    }

    // if (tipo == 'servico') {
    //     const servico = new Servico({
    //         nome: req.body.nome,
    //         hora: req.body.hora,
    //     })

    //     await servico.save()    //Salvar no banco (JSON)
    //     res.send({msg: "Cadastrou essa porra vai curintia"})
    // }
})

app.post('/gerarPedido/:nomeParams', async (req, res) => {
    try {
        const { nomeParams } = req.params;
        const usuario = await Usuario.findOne({ nome: nomeParams });

        if (!usuario) {
            return res.status(404).send({ msg: 'Usuário não encontrado.' });
        }

        const userId = usuario._id;
        const dadosPedido: Pedido = { userId, ...req.body };
        const novoPedido: Pedido = await PedidoModel.create(dadosPedido);

        res.send({ msg: "Pedido inserido com sucesso.", Pedido: novoPedido });
    } catch (err) {
        console.error('Erro ao gerar pedido:', err);
        res.status(500).send({ msg: 'Erro ao gerar pedido.' });
    }
});

app.get('/listar', async (req, res) => {
    const usuarioLista = await Usuario.find()   //Traz uma lista de usuários que ele achar no JSON
    const produtoLista = await Produto.find()
    // const servicoLista = await Servico.find()
    const pedidoLista = await PedidoModel.find()
    res.send({ Usuarios: usuarioLista, Pedidos: pedidoLista, Produtos: produtoLista }) //, Servicos: servicoLista})
})

app.listen(3001, () => {
    console.log("Rodando");
})