import mongoose from "mongoose";

const ProdutoSchema = new mongoose.Schema({
    nome: String,
    preco: Number,
    dataVencimento: {type: Date, default: Date.now()}
});

export const Produto = mongoose.model('Produto', ProdutoSchema);