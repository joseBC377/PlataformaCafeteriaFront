import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { AdminServices } from '../services/admin.services';
import { UsuarioModel } from '../../features/auth/models/usuario';

@Component({
  selector: 'app-usuarios',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './usuarios.html',
  styleUrls: ['./usuarios.css']
})
export class Usuarios {
  protected usuario$!: Observable<UsuarioModel[]>;
  protected usuarioForm!: FormGroup;
  protected roles: string[] = ['ADMIN', 'CLIENTE'];

  private serv = inject(AdminServices);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      rol: ['', Validators.required]
    });

    this.usuario$ = this.serv.getSeletAllUsers(); 
  }

  get nombre() { return this.usuarioForm.get('nombre'); }
  get apellido() { return this.usuarioForm.get('apellido'); }
  get correo() { return this.usuarioForm.get('correo'); }
  get contrasena() { return this.usuarioForm.get('contrasena'); }
  get telefono() { return this.usuarioForm.get('telefono'); }
  get rol() { return this.usuarioForm.get('rol'); }

  registroFn() {
    if (this.usuarioForm.invalid) {
      this.usuarioForm.markAllAsTouched();
      console.log('Formulario de registro inválido');
      return;
    }

    console.log('Formulario válido ✅', this.usuarioForm.value);
  
  }
}
