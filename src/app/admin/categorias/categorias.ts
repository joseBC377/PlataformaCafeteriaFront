import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { CategoriaModel } from '../../features/auth/models/categoria';
import { CategoriaServices } from '../services/categoria.services';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
@Component({
  selector: 'app-categorias',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormsModule],
  templateUrl: './categorias.html',
  styleUrls: ['./categorias.css']
})
export class CategoriasComponent {
  protected categorias$!: Observable<CategoriaModel[]>;
  private serv = inject(CategoriaServices);
  private fb = inject(FormBuilder)

  public categoriaForm: FormGroup = this.fb.group({
    id: [null],
    nombre: ['', [Validators.required, Validators.minLength(3)]],
  });

  public modoEdicion = false;
  public idCategoriaEditar: number | null = null;

  get nombre() { return this.categoriaForm.get('nombre'); }

ngOnInit(): void {
  this.categorias$ = this.serv.getSelectcategoria().pipe(
    map(categorias => categorias.sort((a, b) => a.id - b.id))
  );
}

  registroCategoria(): void {
    if (this.categoriaForm.invalid) {
      this.categoriaForm.markAllAsTouched();
      console.log('Formulario inválido');
      return;
    }

    const data = this.categoriaForm.value;

    if (this.modoEdicion) {
      this.serv.putUpdatecategoria(this.idCategoriaEditar!, data).subscribe(() => {
        this.categorias$ = this.serv.getSelectcategoria();
        this.resetFormulario();
      });
    } else {
      this.serv.postcategoria(data).subscribe(() => {
        this.categorias$ = this.serv.getSelectcategoria();
        this.resetFormulario();
      });
    }
  }

  editarCategoria(cat: CategoriaModel): void {
    this.categoriaForm.patchValue(cat);
    this.idCategoriaEditar = cat.id ?? null;
    this.modoEdicion = true;
  }

  eliminarCategoria(id: number): void {
    if (confirm('¿Deseas eliminar esta categoría?')) {
      this.serv.deleteIdcategoria(id).subscribe(() => {
        this.categorias$ = this.serv.getSelectcategoria();
        if (this.idCategoriaEditar === id) this.resetFormulario();
      });
    }
  }

  resetFormulario(): void {
    this.categoriaForm.reset();
    this.modoEdicion = false;
    this.idCategoriaEditar = null;
  }

}
