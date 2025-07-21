import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PedidoModel } from '../../features/auth/models/pedido';

@Injectable({
  providedIn: 'root'
})
export class PedidoService {
  private API_URL = "http://localhost:8082/api/pedido"
  private http = inject(HttpClient);

  getSelectpedido(): Observable<PedidoModel[]> {
    return this.http.get<PedidoModel[]>(`${this.API_URL}/lista`);
  }
  getSelectpedidoId(id: number): Observable<PedidoModel> {
    return this.http.get<PedidoModel>(`${this.API_URL}/lista/${id}`);
  }
  postInsertpedido(pedido: PedidoModel): Observable<PedidoModel> {
    return this.http.post<PedidoModel>(`${this.API_URL}/insertar`, pedido);
  }
  putUpdatepedido(id: number, pedido: PedidoModel): Observable<PedidoModel> {
    return this.http.put<PedidoModel>(`${this.API_URL}/actualizar/${id}`, pedido);
  }
  deleteIdpedido(id: number): Observable<PedidoModel> {
    return this.http.delete<PedidoModel>(`${this.API_URL}/eliminar/${id}`);
  }
}
