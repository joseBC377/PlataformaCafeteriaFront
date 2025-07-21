import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ContactoService } from '../../admin/services/contacto.services';
import { ContactoModel } from '../../features/auth/models/contacto';
import { response } from 'express';

@Component({
  selector: 'app-contactanos',
  imports: [CommonModule,ReactiveFormsModule],
  templateUrl: './contactanos.html',
  styleUrl: './contactanos.css'
})
export class Contactanos {
  private serv = inject(ContactoService);
  private fb = inject(FormBuilder);

  mensajeEnviado: boolean = false;

  public contactoformulario: FormGroup = this.fb.group({
    nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')]],
    apellido: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\\s]*$')]],
    correo: ['', [Validators.required, Validators.email]],
    mensaje: ['', Validators.required]
  });

  get nombre() {
    return this.contactoformulario.get('nombre');
  }

  get apellido() {
    return this.contactoformulario.get('apellido');
  }

  get correo() {
    return this.contactoformulario.get('correo');
  }

  get mensaje() {
    return this.contactoformulario.get('mensaje');
  }

  contactoForm() {
    if (this.contactoformulario.invalid) {
      this.contactoformulario.markAllAsTouched();
      return;
    }

    const datos: ContactoModel = this.contactoformulario.value;

    this.serv.postInsertContacto(datos).subscribe({
      next: (response) => {
        console.log('Formulario enviado correctamente', response);
        this.mensajeEnviado = true;
        this.contactoformulario.reset();

        setTimeout(() => {
          this.mensajeEnviado = false;
        }, 5000);
      },
      error: (err) => {
        console.error('Error al enviar el formulario', err);
      }
    });
  }
}