import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { SubcategoriaModel } from '../../features/auth/models/subcategoria';
import { SubcategoriaServices } from '../services/subcategoria.services';
import { CategoriaServices } from '../services/categoria.services';
import { CategoriaModel } from '../../features/auth/models/categoria';
import { firstValueFrom, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-subcategorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './subcategoria.html',
  styleUrls: ['./subcategoria.css']
})
export class SubcategoriasComponent {
  protected subcategorias$!: Observable<SubcategoriaModel[]>;
  protected categorias$!: Observable<CategoriaModel[]>;

  private subServ = inject(SubcategoriaServices);
  private catServ = inject(CategoriaServices);
  private fb = inject(FormBuilder);

  public subcategoriaForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
    categoria: [null, Validators.required]
  });

  public modoEdicion = false;
  public idSubEditar: number | null = null;

  get nombre() {
    return this.subcategoriaForm.get('nombre');
  }

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.subcategorias$ = this.subServ.getAllSubcategorias().pipe(
      map((subs) => subs.sort((a, b) => a.id! - b.id!))
    );
    this.categorias$ = this.catServ.getSelectcategoria();
  }

  registroSubcategoria(): void {
    if (this.subcategoriaForm.invalid) {
      this.subcategoriaForm.markAllAsTouched();
      return;
    }

    const raw = this.subcategoriaForm.value;

    if (!raw.categoria || !raw.categoria.id) {
      alert('Selecciona una categoría válida');
      return;
    }

   const data: SubcategoriaModel = {
  id: raw.id,
  nombre: raw.nombre,
  categoria: {
    id: raw.categoria.id,
    nombre: raw.categoria.nombre 
  }
};
    if (this.modoEdicion && this.idSubEditar !== null) {
      this.subServ.updateSubcategoria(this.idSubEditar, data).subscribe(() => {
        this.cargarDatos();
        this.resetFormulario();
      });
    } else {
      this.subServ.postSubcategoria(data).subscribe(() => {
        this.cargarDatos();
        this.resetFormulario();
      });
    }
  }
editarSubcategoria(sub: SubcategoriaModel): void {
  firstValueFrom(this.categorias$).then(catList => {
    const categoriaMatch = catList.find(cat => cat.id === sub.categoria.id);

    this.subcategoriaForm.patchValue({
      id: sub.id,
      nombre: sub.nombre,
      categoria: categoriaMatch ?? null
    });

    this.idSubEditar = sub.id ?? null;
    this.modoEdicion = true;
  });
}
  eliminarSubcategoria(id: number): void {
    if (confirm('¿Deseas eliminar esta subcategoría?')) {
      this.subServ.deleteSubcategoria(id).subscribe(() => {
        this.cargarDatos();
        if (this.idSubEditar === id) this.resetFormulario();
      });
    }
  }

  resetFormulario(): void {
    this.subcategoriaForm.reset();
    this.modoEdicion = false;
    this.idSubEditar = null;
  }
compararCategorias = (a: CategoriaModel, b: CategoriaModel): boolean => {
  return a && b ? a.id === b.id : a === b;
};


}
