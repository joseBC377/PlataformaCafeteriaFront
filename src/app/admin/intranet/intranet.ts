import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { UsuarioModel } from '../../features/auth/models/usuario';
import { ConteoRol } from '../../features/auth/models/conteo-rol';
import { AdminServices } from '../services/admin.services';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-intranet',
  imports: [CommonModule],
  templateUrl: './intranet.html',
  styleUrl: './intranet.css'
})
export class Intranet {
  protected usuario$!: Observable<UsuarioModel[]>;
  protected usuarioReserva$!: Observable<UsuarioModel[]>;
  protected contero$!: Observable<ConteoRol[]>;
  private serv = inject(AdminServices);
  ngOnInit() {
    this.getUsuario();
    this.contero$ = this.serv.getCountUsersRol();
  }

  getUsuario() {
    this.usuario$ = this.serv.getSeletAllUsers();
  }

}