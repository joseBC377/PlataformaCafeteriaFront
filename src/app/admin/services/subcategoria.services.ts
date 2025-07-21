import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { SubcategoriaModel } from '../../features/auth/models/subcategoria';

@Injectable({
  providedIn: 'root'
})
export class SubcategoriaServices {
  private API_URL = 'http://localhost:8082/api/subcategoria';
  private http = inject(HttpClient);

  getAllSubcategorias(): Observable<SubcategoriaModel[]> {
    return this.http.get<SubcategoriaModel[]>(`${this.API_URL}/lista`);
  }

  getSubcategoriaById(id: number): Observable<SubcategoriaModel> {
    return this.http.get<SubcategoriaModel>(`${this.API_URL}/lista/${id}`);
  }

  postSubcategoria(sub: SubcategoriaModel): Observable<SubcategoriaModel> {
    return this.http.post<SubcategoriaModel>(`${this.API_URL}/insertar`, sub);
  }

  updateSubcategoria(id: number, sub: SubcategoriaModel): Observable<SubcategoriaModel> {
    return this.http.put<SubcategoriaModel>(`${this.API_URL}/actualizar/${id}`, sub);
  }

  deleteSubcategoria(id: number): Observable<string> {
    return this.http.delete(`${this.API_URL}/eliminar/${id}`, {
      responseType: 'text'
    });
  }
}
