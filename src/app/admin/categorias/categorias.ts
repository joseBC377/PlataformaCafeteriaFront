import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class CategoriasComponent {
  modoEdicion = false;
  idCategoriaEditar: number | null = null;

  categorias = [
    { id_categoria: 1, nombre: 'Frappuccinos' },
    { id_categoria: 2, nombre: 'Espresso Caliente' },
    { id_categoria: 3, nombre: 'Matcha' }
  ];

  nuevaCategoria = {
    nombre: ''
  };

  agregarCategoria() {
    const nueva = {
      ...this.nuevaCategoria,
      id_categoria: this.categorias.length + 1
    };
    this.categorias.push(nueva);
    this.resetFormulario();
  }

  editarCategoria(categoria: any) {
    this.nuevaCategoria = { ...categoria };
    this.modoEdicion = true;
    this.idCategoriaEditar = categoria.id_categoria;
  }

  actualizarCategoria() {
    if (this.idCategoriaEditar !== null) {
      const index = this.categorias.findIndex(c => c.id_categoria === this.idCategoriaEditar);
      if (index !== -1) {
        this.categorias[index] = { ...this.nuevaCategoria, id_categoria: this.idCategoriaEditar };
      }
      this.modoEdicion = false;
      this.idCategoriaEditar = null;
      this.resetFormulario();
    }
  }

  eliminarCategoria(id: number) {
    const confirmar = confirm('¿Deseas eliminar esta categoría?');
    if (confirmar) {
      this.categorias = this.categorias.filter(c => c.id_categoria !== id);
      if (this.idCategoriaEditar === id) {
        this.modoEdicion = false;
        this.idCategoriaEditar = null;
      }
    }
  }

  resetFormulario() {
    this.nuevaCategoria = {
      nombre: ''
    };
  }
}
