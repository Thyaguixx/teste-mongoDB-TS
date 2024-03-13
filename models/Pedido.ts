import mongoose, { Document } from "mongoose";

// Modelo de dados para pedido
export interface Pedido extends Document {
    userId: mongoose.Types.ObjectId;
    produtoNome: string;
    quantidade: number;
}

const pedidoSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    produtoNome: { type: String, required: true },
    quantidade: { type: Number, required: true }
});

export const PedidoModel = mongoose.model<Pedido>('Pedido', pedidoSchema);