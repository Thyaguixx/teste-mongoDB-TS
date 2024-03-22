import mongoose, { Document } from "mongoose";

// export interface usuarioInterface{
//     nome: string,
//     idade: number
// }

const UsuarioSchema = new mongoose.Schema({
    nome: {type: String, required: true, unique: true},
    idade: {type: Number}
});

export const Usuario = mongoose.model('Usuario', UsuarioSchema);

