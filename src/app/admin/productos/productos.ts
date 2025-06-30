import { CommonModule, NgFor, NgForOf } from '@angular/common';
import { Component, NgModule } from '@angular/core';
import { FormsModule, NgModel } from '@angular/forms';

@Component({
  selector: 'app-productos',
  standalone: true, // 👈 Esta es la clave
  imports: [CommonModule, FormsModule],
  templateUrl: './productos.html',
  styleUrl: './productos.css'
})

export class Productos {
  subcategorias = ['Bebidas Calientes', 'Bebidas Frías', 'Snacks'];

  productos = [
    {
      id: 1,
      nombre: 'Café Latte',
      descripcion: 'Espresso con leche vaporizada.',
      precio: 12.50,
      imagen: 'https://',
      subcategoria: 'Bebidas Calientes'
    },
    {
      id: 2,
      nombre: 'Muffin de Arándanos',
      descripcion: 'Muffin suave con arándanos naturales.',
      precio: 9.50,
      imagen: 'https://',
      subcategoria: 'Snacks'
    },
    {
      id: 3,
      nombre: 'Capuchino',
      descripcion: 'Espresso con leche y una gruesa capa de espuma.',
      precio: 13.00,
      imagen: 'https://',
      subcategoria: 'Bebidas Calientes'
    },
    {
      id: 4,
      nombre: 'Muffin de Arándanos',
      descripcion: 'Suave y dulce muffin relleno de arándanos naturales.',
      precio: 9.50,
      imagen: 'https://',
      subcategoria: 'Snacks'
    },
    {
      id: 5,
      nombre: 'Té Chai Latte',
      descripcion: 'Té negro con especias, leche y un toque dulce.',
      precio: 14.00,
      imagen: 'https://',
      subcategoria: 'Bebidas Calientes'
    }
  ];

  nuevoProducto = {
    nombre: '',
    descripcion: '',
    precio: 0,
    imagen: '',
    subcategoria: this.subcategorias[0]
  };

  agregarProducto() {
    const nuevo = { ...this.nuevoProducto, id: this.productos.length + 1 };
    this.productos.push(nuevo);
    this.nuevoProducto = {
      nombre: '',
      descripcion: '',
      precio: 0,
      imagen: '',
      subcategoria: this.subcategorias[0]
    };
  }

  eliminarProducto(id: number) {
    this.productos = this.productos.filter(p => p.id !== id);
  }
}
