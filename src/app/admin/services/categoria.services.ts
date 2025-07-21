import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CategoriaModel } from '../../features/auth/models/categoria';

@Injectable({
  providedIn: 'root'
})
export class CategoriaServices {
  private API_URL = "http://localhost:8082/api/categoria"
  private http = inject(HttpClient);

  getSelectcategoria(): Observable<CategoriaModel[]> {
    return this.http.get<CategoriaModel[]>(`${this.API_URL}/lista`);
  }
  getSelectcategoriaId(id: number): Observable<CategoriaModel> {
    return this.http.get<CategoriaModel>(`${this.API_URL}/lista/${id}`);
  }
  postcategoria(categoria: CategoriaModel): Observable<CategoriaModel> {
    return this.http.post<CategoriaModel>(`${this.API_URL}/insertar`, categoria);
  }
  putUpdatecategoria(id: number, categoria: CategoriaModel): Observable<CategoriaModel> {
    return this.http.put<CategoriaModel>(`${this.API_URL}/actualizar/${id}`, categoria);
  }
  deleteIdcategoria(id: number): Observable<string> {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`, {
      responseType: 'text'
    });
  }
}