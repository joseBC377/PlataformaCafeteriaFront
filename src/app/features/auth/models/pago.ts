import { PedidoModel } from "./pedido";

export interface PagoModel {
    idPago:number;
    total:number;
    metodo_pago:string;
    fecha_pago:string;
    Pedido:PedidoModel;
}
