
import { Component, inject } from '@angular/core';
import { Observable } from 'rxjs';
import { ContactoModel } from '../../features/auth/models/contacto';
import { ContactoService } from '../services/contacto.services';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-contacto',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class Contacto {
  protected contacto$!: Observable<ContactoModel[]>;
  protected contactoForm!: FormGroup;

  private serv = inject(ContactoService);
  private fb = inject(FormBuilder);

  ngOnInit(): void {
    this.contacto$ = this.serv.getSelectContact();

    this.contactoForm = this.fb.group({
      nombre: ['', Validators.required],
      apellido: ['', Validators.required],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required],
      id_usuario: this.fb.group({
        id: [null, Validators.required]
      })
    });
  }

  // enviarMensaje(): void {
  //   if (this.contactoForm.invalid) {
  //     this.contactoForm.markAllAsTouched();
  //     return;
  //   }

  //   const data: ContactoModel = this.contactoForm.value;

  //   this.serv.postInsertContacto(data).subscribe({
  //     next: () => {
  //       alert('Mensaje enviado correctamente ');
  //       this.contacto$ = this.serv.getSelectContact(); 
  //       this.contactoForm.reset();
  //     },
  //     error: err => {
  //       console.error('Error al enviar mensaje:', err);
  //       alert('Error al enviar el mensaje');
  //     }
  //   });
  // }
  eliminarContacto(id: number): void {
  if (confirm('¿Deseas eliminar este mensaje?')) {
    this.serv.deleteContacto(id).subscribe({
      next: () => {
        this.contacto$ = this.serv.getSelectContact(); 
      },
      error: err => {
        console.error('Error al eliminar contacto:', err);
        alert('Error al eliminar el mensaje');
      }
    });
  }
}

}
