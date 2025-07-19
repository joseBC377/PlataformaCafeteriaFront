import { CommonModule, CurrencyPipe, NgClass } from '@angular/common';
import { Component, Inject, OnInit } from '@angular/core';
import { catchError, Observable, of, tap } from 'rxjs';
import { ProductoModel } from '../../features/auth/models/producto';
import { ProductoServices } from '../../admin/services/producto.services';
import { CategoriaModel } from '../../features/auth/models/categoria';
import { SubcategoriaServices } from '../../admin/services/subcategoria.services';
import { SubcategoriaModel } from '../../features/auth/models/subcategoria';
import { CategoriaServices } from '../../admin/services/categoria.services';

@Component({
  selector: 'app-menu',
  imports: [NgClass, CurrencyPipe, CommonModule],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu implements OnInit {
  isActive: number = 0;
  setActive(item: number) {
    this.isActive = item;
  }
  isCircle: number = 0;
  setCircle(item: number) {
    this.isCircle = item;
  }
  mostrarElemento: boolean = false;
  selectedProductoForModel: ProductoModel | null = null;
  toggleModal(producto: ProductoModel | null = null): void {
    this.mostrarElemento = !this.mostrarElemento;
    if (this.mostrarElemento && producto) {
      this.selectedProductoForModel = producto;
    } else {
      this.selectedProductoForModel = null; // Limpiar cuando se cierra
    }
    console.log('El modal está visible:', this.mostrarElemento);
  }
  realizarPedido() {
    alert('Gracias por tu pedido 🛍️ ¡Estamos preparándolo!');
  }

  protected producto$!: Observable<ProductoModel[]>;
  protected categoria$!: Observable<CategoriaModel[]>;
  protected subcategoria$!: Observable<SubcategoriaModel[]>;
 constructor(
    private pro: ProductoServices, 
    private cat: CategoriaServices, 
    private sub: SubcategoriaServices // Angular proporcionará una instancia de SubcategoriaServices aquí
  ) {}

 ngOnInit() {
    // Ahora 'this.pro', 'this.cat' y 'this.sub' estarán definidos
    this.producto$ = this.pro.getAllProductos().pipe( // Llama como método si lo es
      tap(data => console.log('Productos cargados:', data)),
      catchError(error => {
        console.error('Error cargando productos:', error);
        return of([]); // Retorna un array vacío para que el bloque @empty muestre un mensaje
      })
    );
    this.categoria$ = this.cat.getSelectcategoria().pipe( // Llama como método si lo es
      tap(data => console.log('Categorías cargadas:', data)),
      catchError(error => {
        console.error('Error cargando categorías:', error);
        return of([]);
      })
    );
    this.subcategoria$ = this.sub.getAllSubcategorias().pipe( // Llama como método si lo es
      tap(data => console.log('Subcategorías cargadas:', data)),
      catchError(error => {
        console.error('Error cargando subcategorías:', error);
        return of([]);
      })
    );
  }

}
