import { PedidoModel } from "./pedido";

export interface PagoModel {
    id?:number;
    total:number;
    metodo_pago:string;
    fecha_pago:string;
    id_pedido:PedidoModel;
}
