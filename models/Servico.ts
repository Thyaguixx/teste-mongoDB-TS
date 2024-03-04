import mongoose from "mongoose";

const db = mongoose.connection.useDb('testeThy')

const ServicoSchema = new mongoose.Schema({
    nome: String,
    hora: String,
    dataVencimento: {type: Date, default: Date.now()}
});

export const Servico = db.model('Servico', ServicoSchema);