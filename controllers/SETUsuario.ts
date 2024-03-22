import { Usuario } from "../models/Usuario";

export async function SETUsuario(dadosUsuario){
    try {
        const usuario = new Usuario({
            nome: dadosUsuario.nome,
            idade: dadosUsuario.idade
        })
    
        await usuario.save()    //Salvar no banco (JSON)
        return {Sucesso: true, Retorno: usuario.toJSON()} 
    } catch (erro) {
        return {Sucesso: false, Erro: erro}
    }
}