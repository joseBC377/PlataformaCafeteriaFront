import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoModel } from '../../features/auth/models/pago';
import { PedidoModel } from '../../features/auth/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private API_URL = "http://localhost:8082/api/pago"
  private http = inject(HttpClient);

  getSelectPago(): Observable<PagoModel[]> {
    return this.http.get<PagoModel[]>(`${this.API_URL}/lista`);
  }
  getSelectPagoId(id: number): Observable<PagoModel> {
    return this.http.get<PagoModel>(`${this.API_URL}/lista/${id}`);
  }
  postInsertPago(pago: PagoModel): Observable<PagoModel> {
    return this.http.post<PagoModel>(`${this.API_URL}/insertar`, pago);
  }
  putUpdatePago(id: number, pago: PagoModel): Observable<PagoModel> {
    return this.http.put<PagoModel>(`${this.API_URL}/actualizar/${id}`, pago);
  }
  deleteIdPago(id: number): Observable<PagoModel> {
    return this.http.delete<PagoModel>(`${this.API_URL}/eliminar/${id}`);
  }
  postPedido(pedido: PedidoModel): Observable<PedidoModel> {
    return this.http.post<PedidoModel>(`${this.API_URL}/completo`, pedido);
  }
}
