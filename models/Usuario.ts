import mongoose from "mongoose";

const UsuarioSchema = new mongoose.Schema({
    nome: String,
    idade: String
});

export const Usuario = mongoose.model('Usuario', UsuarioSchema);

