import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ConteoRol } from '../../features/auth/models/conteo-rol';
import { UsuarioModel } from '../../features/auth/models/usuario';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {
  private API_URL = "http://localhost:8082/api/usuario"
  private http = inject(HttpClient);

  getCountUsersRol(): Observable<ConteoRol[]> {
    return this.http.get<ConteoRol[]>(`${this.API_URL}/contarUsuariosRol`);
  }
  getSeletAllUsers():Observable<UsuarioModel[]>{
    return this.http.get<UsuarioModel[]>(`${this.API_URL}/lista`);
  }
  getSelectIdUser(id:number):Observable<UsuarioModel>{
    return this.http.get<UsuarioModel>(`${this.API_URL}/lista/${id}`);
  }
  postInsertIdUser(usuario:UsuarioModel):Observable<UsuarioModel>{
    return this.http.post<UsuarioModel>(`${this.API_URL}/insertar`,usuario);
  }
  putUpdateUser(id:number, usuario:UsuarioModel):Observable<UsuarioModel>{
    return this.http.put<UsuarioModel>(`${this.API_URL}/actualizar/${id}`,usuario);
  }
  deleteIdUser(id:number):Observable<any>{
    return this.http.delete<UsuarioModel>(`${this.API_URL}/eliminar/${id}`)
  }

}