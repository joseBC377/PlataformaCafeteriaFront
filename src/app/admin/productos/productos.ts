import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { BehaviorSubject } from 'rxjs';
import { ProductoModel } from '../../features/auth/models/producto';
import { SubcategoriaModel } from '../../features/auth/models/subcategoria';
import { ProductoServices } from '../services/producto.services';
import { SubcategoriaServices } from '../services/subcategoria.services';

@Component({
  selector: 'app-productos',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './productos.html',
  styleUrls: ['./productos.css']
})
export class ProductosComponent  {
 protected productosSubject = new BehaviorSubject<ProductoModel[]>([]);
protected productos$ = this.productosSubject.asObservable();
  protected subcategorias$!: Observable<SubcategoriaModel[]>;

  private productoServ = inject(ProductoServices);
  private subServ = inject(SubcategoriaServices);
  private fb = inject(FormBuilder);

 public productoForm: FormGroup = this.fb.group({
  id: [null],
  nombre: ['', [Validators.required, Validators.minLength(3)]],
  descripcion: ['', Validators.required],
  precio: [0, [Validators.required, Validators.min(0.01)]],
  subcategoria: [null, Validators.required]
});


public eliminandoIds = new Set<number>();

  public modoEdicion = false;
  public idProductoEditar: number | null = null;

  get nombre() {
    return this.productoForm.get('nombre');
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
   this.productoServ.getAllProductos().subscribe(data => {
  const ordenados = data.sort((a, b) => a.id! - b.id!);
  this.productosSubject.next(ordenados);
});

    this.subcategorias$ = this.subServ.getAllSubcategorias();
  }

registroProducto(): void {
  if (this.productoForm.invalid) {
    this.productoForm.markAllAsTouched();
    return;
  }

  const fileInput = document.querySelector<HTMLInputElement>('#fileImagen');
  const archivo = fileInput?.files?.[0];

  const raw = this.productoForm.value;
  const formData = new FormData();
  formData.append('nombre', raw.nombre);
  formData.append('descripcion', raw.descripcion);
  formData.append('precio', raw.precio.toString());
  formData.append('id_subcategoria', raw.subcategoria.id.toString());
  if (archivo) {
    formData.append('imagen', archivo);
  }
  if (this.modoEdicion && this.idProductoEditar !== null) {
    this.productoServ.updateProductoFormData(this.idProductoEditar, formData).subscribe({
      next: () => {
        this.cargarDatos();
        this.resetFormulario();
      },
      error: err => {
        console.error('Error al actualizar producto', err);
      }
    });
  } else {
    if (!archivo) {
      alert('Debe seleccionar una imagen.');
      return;
    }
    this.productoServ.insertProductoFormData(formData).subscribe({
      next: () => {
        this.cargarDatos();
        this.resetFormulario();
      },
      error: err => {
        console.error('Error al registrar producto', err);
      }
    });
  }
}



 editarProducto(prod: ProductoModel): void {
  // Buscar la subcategoría exacta en la lista
  this.subServ.getAllSubcategorias().subscribe(subcategorias => {
    const subcategoriaMatch = subcategorias.find(
      sub => sub.id === prod.subcategoria.id
    );

    this.productoForm.patchValue({
      ...prod,
      subcategoria: subcategoriaMatch ?? null
    });

    this.idProductoEditar = prod.id ?? null;
    this.modoEdicion = true;
  });
}


 eliminarProducto(id: number): void {
  if (this.eliminandoIds.has(id)) return; // ✅ Previene doble clic

  if (confirm('¿Deseas eliminar este producto?')) {
    this.eliminandoIds.add(id); // ✅ Marca como eliminando

    this.productoServ.deleteProductos(id).subscribe({
      next: () => {
        this.productos$ = this.productos$.pipe(
          map(productos => productos.filter(p => p.id !== id))
        );
        if (this.idProductoEditar === id) {
          this.resetFormulario();
        }
        this.eliminandoIds.delete(id); // ✅ Libera el ID
      },
      error: err => {
        console.error('Error al eliminar producto', err);

        // ✅ Si ya fue eliminado, lo quitamos igual
        if (err.status === 404) {
          this.productos$ = this.productos$.pipe(
            map(productos => productos.filter(p => p.id !== id))
          );
        } else {
          alert('Error al eliminar. Verifica si el producto ya fue eliminado.');
        }

        this.eliminandoIds.delete(id); // ✅ Siempre liberamos
      }
    });
  }
}


  resetFormulario(): void {
    this.productoForm.reset();
    this.modoEdicion = false;
    this.idProductoEditar = null;
  }
}
