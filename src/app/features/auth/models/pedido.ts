import { UsuarioModel } from "./usuario";

export interface PedidoModel {
    id:number;
    fecha:string,
    Usuario:UsuarioModel,
}
