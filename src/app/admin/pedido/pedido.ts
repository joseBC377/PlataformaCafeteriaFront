import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-pedido',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './pedido.html',
  styleUrl: './pedido.css'
})
export class PedidoComponent {
  modoEdicion = false;
  idPedidoEditar: number | null = null;

  usuarios = [
    { id: 1, nombre: 'Ana' },
    { id: 2, nombre: 'Luis' },
    { id: 3, nombre: 'Carmen' }
  ];

  productos = [
    { id: 1, nombre: 'Mocha blanco', precio: 18.50, imagen: '/images/menu/imagen_carta/image_1.jpg' },
    { id: 2, nombre: 'Cookies & Creme', precio: 16.50, imagen: '/images/menu/imagen_carta/image_2.jpg' },
    { id: 3, nombre: 'Chocolate Creme', precio: 17.00, imagen: '/images/menu/imagen_carta/image_3.png' },
    { id: 4, nombre: 'Matcha Latte', precio: 16.00, imagen: '/images/menu/imagen_carta/image_4.png' }
  ];

  pedidos: any[] = [];

  nuevoPedido = {
    fecha: '',
    id_usuario: this.usuarios[0],
    producto: this.productos[0],
    cantidad: 1
  };

  agregarPedido() {
    const nuevo = {
      id: this.pedidos.length + 1,
      fecha: this.nuevoPedido.fecha,
      usuario: this.nuevoPedido.id_usuario,
      detalle: {
        producto: this.nuevoPedido.producto,
        cantidad: this.nuevoPedido.cantidad,
        precio_unitario: this.nuevoPedido.producto.precio
      }
    };
    this.pedidos.push(nuevo);
    this.resetFormulario();
  }

  editarPedido(pedido: any) {
    this.modoEdicion = true;
    this.idPedidoEditar = pedido.id;
    this.nuevoPedido = {
      fecha: pedido.fecha,
      id_usuario: pedido.usuario,
      producto: pedido.detalle.producto,
      cantidad: pedido.detalle.cantidad
    };
  }

  actualizarPedido() {
    if (this.idPedidoEditar !== null) {
      const index = this.pedidos.findIndex(p => p.id === this.idPedidoEditar);
      if (index !== -1) {
        this.pedidos[index] = {
          id: this.idPedidoEditar,
          fecha: this.nuevoPedido.fecha,
          usuario: this.nuevoPedido.id_usuario,
          detalle: {
            producto: this.nuevoPedido.producto,
            cantidad: this.nuevoPedido.cantidad,
            precio_unitario: this.nuevoPedido.producto.precio
          }
        };
      }
      this.resetFormulario();
      this.modoEdicion = false;
      this.idPedidoEditar = null;
    }
  }

  eliminarPedido(id: number) {
    this.pedidos = this.pedidos.filter(p => p.id !== id);
    if (this.idPedidoEditar === id) {
      this.modoEdicion = false;
      this.idPedidoEditar = null;
    }
  }

  resetFormulario() {
    this.nuevoPedido = {
      fecha: '',
      id_usuario: this.usuarios[0],
      producto: this.productos[0],
      cantidad: 1
    };
  }
}
