import { UsuarioModel } from "./usuario";

export interface DetallePedidoModel {
    id?:number,
    id_pedido:number,
    id_detalle:number,
    fecha:string,
    id_Usuario:UsuarioModel,
}
