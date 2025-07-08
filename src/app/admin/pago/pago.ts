import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pagos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pago.html',
  styleUrl: './pago.css'
})
export class PagosComponent {
  modoEdicion = false;
  idPagoEditar: number | null = null;

  usuarios = [
    { id_usuario: 1, nombre: 'Ana Torres' },
    { id_usuario: 2, nombre: 'Pedro Salazar' },
    { id_usuario: 3, nombre: 'Lucía Gamarra' }
  ];

  pedidos = [
    { id_pedido: 1, descripcion: 'Pedido 1' },
    { id_pedido: 2, descripcion: 'Pedido 2' },
    { id_pedido: 3, descripcion: 'Pedido 3' }
  ];

  pagos: any[] = [];

  nuevoPago = {
    id_usuario: this.usuarios[0],
    id_pedido: this.pedidos[0],
    fecha_pago: '',
    monto: 0
  };

  agregarPago() {
    const nuevo = {
      ...this.nuevoPago,
      id_pago: this.pagos.length + 1
    };
    this.pagos.push(nuevo);
    this.resetFormulario();
  }

  editarPago(pago: any) {
    this.nuevoPago = { ...pago };
    this.modoEdicion = true;
    this.idPagoEditar = pago.id_pago;
  }

  actualizarPago() {
    if (this.idPagoEditar !== null) {
      const index = this.pagos.findIndex(p => p.id_pago === this.idPagoEditar);
      if (index !== -1) {
        this.pagos[index] = { ...this.nuevoPago, id_pago: this.idPagoEditar };
      }
      this.modoEdicion = false;
      this.idPagoEditar = null;
      this.resetFormulario();
    }
  }

  eliminarPago(id: number) {
    const confirmar = confirm('¿Estás seguro de eliminar este pago?');
    if (confirmar) {
      this.pagos = this.pagos.filter(p => p.id_pago !== id);
      if (this.idPagoEditar === id) {
        this.modoEdicion = false;
        this.idPagoEditar = null;
      }
    }
  }

  resetFormulario() {
    this.nuevoPago = {
      id_usuario: this.usuarios[0],
      id_pedido: this.pedidos[0],
      fecha_pago: '',
      monto: 0
    };
  }
}
