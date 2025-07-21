import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { BehaviorSubject, map, Observable } from 'rxjs';
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
  protected usuariosSubject = new BehaviorSubject<UsuarioModel[]>([]);
  protected usuario$ = this.usuariosSubject.asObservable();
  protected usuarioForm!: FormGroup;
  protected roles: string[] = ['ADMIN', 'CLIENTE'];
  protected modoEdicion = false;
  private idUsuarioEditando: number | null = null;

  private serv = inject(AdminServices);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.crearFormulario();
    this.cargarUsuarios();
  }
  private crearFormulario() {
    this.usuarioForm = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(3), Validators.pattern(/^[a-zA-Z\s]*$/)]],
      apellido: ['', [Validators.required, Validators.pattern(/^[a-zA-Z\s]*$/)]],
      correo: ['', [Validators.required, Validators.email]],
      contrasena: ['', [Validators.required, Validators.minLength(8)]],
      telefono: ['', [Validators.required, Validators.pattern(/^[0-9]{9}$/)]],
      rol: ['', Validators.required]
    });

  }
  private cargarUsuarios() {
    this.serv.getSeletAllUsers().subscribe({
      next: (data) => {
        console.log('usuarios cargados: ', data);
        this.usuariosSubject.next(data);
      },
      error: (err) => {
        console.error('error al cargar usuarios', err)
      }
    });
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
    const datos: UsuarioModel = this.usuarioForm.value;
    if (this.modoEdicion && this.idUsuarioEditando !== null) {
      this.serv.putUpdateUser(this.idUsuarioEditando, datos).subscribe({
        next: () => {
          console.log('Usuario actualizado');
          this.resetFormulario();
          this.cargarUsuarios(); // Recargar usuarios después de actualización
        },
        error: (err) => {
          console.error('Error al actualizar usuario:', err);
        }
      });
    } else {
      this.serv.postInsertIdUser(datos).subscribe({
        next: () => {
          console.log('Usuario insertado');
          this.usuarioForm.reset();
          this.cargarUsuarios(); // Recargar usuarios después de inserción
        },
        error: (err) => {
          console.error('Error al insertar usuario:', err);
        }
      });
    }
  }

  editarUsuario(usuario: UsuarioModel) {
    this.modoEdicion = true;
    this.idUsuarioEditando = usuario.id!;
    this.usuarioForm.patchValue(usuario);
  }

  eliminarUsuario(id: number) {
    console.log('Eliminando usuario con id:', id);
    if (confirm('¿Estás seguro que deseas eliminar este usuario?')) {
      this.serv.deleteIdUser(id).subscribe({
        next: (response: any) => {
          console.log('Respuesta recibida:', response);

          // Accede al mensaje y al ID desde la respuesta
          const message = response.message; // "Usuario eliminado correctamente"
          const deletedUserId = response.id; // El ID del usuario eliminado

          // Muestra el mensaje en consola
          console.log(message);

          // Filtramos el usuario eliminado de la lista y actualizamos el BehaviorSubject
          this.usuariosSubject.next(
            this.usuariosSubject.value.filter(usuario => usuario.id !== deletedUserId)
          );
        },
        error: (err) => {
          console.error('Error al eliminar usuario:', err);
          if (err.status === 404) {
            console.log('Usuario no encontrado en la base de datos');
            this.usuariosSubject.next(
              this.usuariosSubject.value.filter(usuario => usuario.id !== id)
            );
          } else {
            alert('Error al eliminar. Verifica si el usuario ya fue eliminado.');
          }
        }
      });
    }
  }

  resetFormulario() {
    this.usuarioForm.reset();
    this.modoEdicion = false;
    this.idUsuarioEditando = null;
  }
}