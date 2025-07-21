import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProductoModel } from '../../features/auth/models/producto';

@Injectable({
  providedIn: 'root'
})
export class ProductoServices {
private API_URL = "http://localhost:8082/api/productos";
  private http = inject(HttpClient);

  getAllProductos(): Observable<ProductoModel[]> {
    return this.http.get<ProductoModel[]>(`${this.API_URL}/lista`);
  }

  insertProductoFormData(formData: FormData): Observable<any> {
  return this.http.post(`${this.API_URL}/insertar`, formData);
}

updateProductoFormData(id: number, formData: FormData): Observable<any> {
  return this.http.put(`${this.API_URL}/actualizar/${id}`, formData);
}


deleteProductos(id: number): Observable<any> {
  return this.http.delete(`${this.API_URL}/eliminar/${id}`, { responseType: 'text' });
}

}
