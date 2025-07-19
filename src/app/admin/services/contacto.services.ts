import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactoModel } from '../../features/auth/models/contacto';

@Injectable({
  providedIn: 'root'
})
export class ContactoService {
  private API_URL = "http://localhost:8082/api/contactenos"
  private http = inject(HttpClient);
  getSelectContact(): Observable<ContactoModel[]> {
    return this.http.get<ContactoModel[]>(`${this.API_URL}/lista`);
  }
  getSelectContactId(id: number): Observable<ContactoModel> {
    return this.http.get<ContactoModel>(`${this.API_URL}/lista/${id}`);
  }
  postInsertContacto(contacto: ContactoModel): Observable<ContactoModel> {
    return this.http.post<ContactoModel>(`${this.API_URL}/insertar`, contacto);
  }
  deleteContacto(id: number): Observable<void> {
    return this.http.delete<void>(`${this.API_URL}/eliminar/${id}`, { responseType: 'text' as 'json' });
  }



}
