import { PedidoModel } from './pedido';

export interface PagoModel {
  id?: number; // << este es el nombre correcto
  total: number;
  metodo_pago: string;
  fecha_pago: string;
  pedido: PedidoModel;
}