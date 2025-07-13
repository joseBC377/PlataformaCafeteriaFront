import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { PedidoModel } from '../../features/auth/models/pedido';
import { PedidoService } from '../services/pedido.services';
import { Observable } from 'rxjs';
import { AdminServices } from '../services/admin.services';
import { UsuarioModel } from '../../features/auth/models/usuario';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class PedidoComponent {
  protected pedido$!: Observable<PedidoModel[]>;
  protected usuarios$!: Observable<UsuarioModel[]>;

  private serv = inject(PedidoService);
  private ususerv = inject(AdminServices);
  private fb = inject(FormBuilder);

  public pedidoForm: FormGroup = this.fb.group({
    id: [null],
    fecha: ['', Validators.required],
    usuario: [null, Validators.required]
  });

  get fecha() { return this.pedidoForm.get('fecha'); }
  get id_usuario() { return this.pedidoForm.get('id_usuario'); }

  public modoEdicion = false;
  public idPedidoEditar: number | null = null;


  registroFn(): void {
    if (this.pedidoForm.invalid) {
      this.pedidoForm.markAllAsTouched();
      console.log('Formulario inválido');
      return;
    }

    const data = this.pedidoForm.value;

    if (this.modoEdicion) {
      this.serv.putUpdatepedido(this.idPedidoEditar!, data).subscribe(() => {
        this.pedido$ = this.serv.getSelectpedido();
        this.resetFormulario();
      });
    } else {
      this.serv.postInsertpedido(data).subscribe(() => {
        this.pedido$ = this.serv.getSelectpedido();
        this.resetFormulario();
      });
    }
  }

  editarPedido(pedido: PedidoModel): void {
    this.pedidoForm.patchValue(pedido);
    this.idPedidoEditar = pedido.id ?? null;
    this.modoEdicion = true;
  }

  eliminarPedido(id: number): void {
    if (confirm('¿Deseas eliminar este pedido?')) {
      this.serv.deleteIdpedido(id).subscribe(() => {
        this.pedido$ = this.serv.getSelectpedido();
        if (this.idPedidoEditar === id) this.resetFormulario();
      });
    }
  }

  resetFormulario(): void {
    this.pedidoForm.reset();
    this.modoEdicion = false;
    this.idPedidoEditar = null;
  }

  ngOnInit(): void {
    this.pedido$ = this.serv.getSelectpedido();
    this.usuarios$ = this.ususerv.getSeletAllUsers(); // O el método correcto
  }
  compararUsuario = (u1: UsuarioModel, u2: UsuarioModel): boolean =>
    u1 && u2 ? u1.id === u2.id : u1 === u2;
}