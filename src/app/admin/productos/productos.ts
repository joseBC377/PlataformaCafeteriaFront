import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})

export class Productos {
  categoriaSeleccionada: string = 'Frappuccinos';

  subcategorias = [
    'Frappuccinos',
    'Espresso Caliente',
    'Espresso Frío',
    'Refresher',
    'Shaken Espresso',
    'Matcha'
  ];

  productos = [
    {
      id: 1,
      nombre: 'Mocha blanco Frappuccino® Alto',
      descripcion: 'Dulce mezcla de chocolate blanco, café y leche con hielo.',
      precio: 18.50,
      imagen: '/images/menu/imagen_carta/image_1.jpg',
      subcategoria: 'Frappuccinos'
    },
    {
      id: 2,
      nombre: 'Cookies & Creme Frappuccino Alto',
      descripcion: 'Mezcla de galletas y crema con hielo y café.',
      precio: 16.50,
      imagen: '/images/menu/imagen_carta/image_2.jpg',
      subcategoria: 'Frappuccinos'
    },
    {
      id: 3,
      nombre: 'Chocolate Cookies & Creme Frappuccino Alto',
      descripcion: 'Versión con chocolate extra y crema.',
      precio: 17.00,
      imagen: '/images/menu/imagen_carta/image_3.png',
      subcategoria: 'Frappuccinos'
    },
    {
      id: 4,
      nombre: 'Matcha Latte',
      descripcion: 'Té verde matcha con leche espumosa.',
      precio: 16.00,
      imagen: '/images/menu/imagen_carta/image_4.png',
      subcategoria: 'Matcha'
    }
  ];

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    subcategoria: this.subcategorias[0]
  };

  modoEdicion = false;
  idProductoEditar: number | null = null;

  agregarProducto() {
    if (this.modoEdicion && this.idProductoEditar !== null) {
      const index = this.productos.findIndex(p => p.id === this.idProductoEditar);
      if (index !== -1) {
        this.productos[index] = { ...this.nuevoProducto, id: this.idProductoEditar };
      }
      this.modoEdicion = false;
      this.idProductoEditar = null;
    } else {
      const nuevo = { ...this.nuevoProducto, id: this.productos.length + 1 };
      this.productos.push(nuevo);
    }
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      subcategoria: this.subcategorias[0]
    };
  }

  editarProducto(producto: any) {
    this.nuevoProducto = { ...producto };
    this.modoEdicion = true;
    this.idProductoEditar = producto.id;
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
    if (this.idProductoEditar === id) {
      this.modoEdicion = false;
      this.idProductoEditar = null;
    }
  }

  actualizarProducto() {
    if (this.idProductoEditar !== null) {
      const index = this.productos.findIndex(p => p.id === this.idProductoEditar);
      if (index !== -1) {
        this.productos[index] = { ...this.nuevoProducto, id: this.idProductoEditar };
      }
      this.modoEdicion = false;
      this.idProductoEditar = null;
      this.nuevoProducto = {
        nombre: '',
        descripcion: '',
        precio: 0,
        imagen: '',
        subcategoria: this.subcategorias[0]
      };
    }
  }
}
