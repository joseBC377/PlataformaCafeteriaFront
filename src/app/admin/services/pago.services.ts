import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PagoModel } from '../../features/auth/models/pago';

@Injectable({
  providedIn: 'root'
})
export class PagoService {
  private API_URL = "http://localhost:8082/api/pago";
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
  const cleanId = Number(String(id).trim());
  return this.http.put<PagoModel>(`${this.API_URL}/actualizar/${cleanId}`, pago);
}


deleteIdPago(id: number): Observable<any> {
  return this.http.delete(`${this.API_URL}/eliminar/${id}`, { responseType: 'text' });
}

}
