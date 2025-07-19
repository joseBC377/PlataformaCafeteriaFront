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
  contactForm!: FormGroup;
  private serv= inject(ContactoService);
  private fb= inject(FormBuilder);
  
    public contactoformulario: FormGroup = this.fb.group({
      nombre: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$')]],
      apellido: ['', [Validators.required, Validators.minLength(2), Validators.pattern('^[a-zA-ZáéíóúÁÉÍÓÚ\s]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      mensaje: ['', Validators.required]
    });
  

  // Getter para cada control
  get nombre() { return this.contactoformulario.get('nombre'); }
  get apellido() { return this.contactoformulario.get('apellido'); }
  get correo() { return this.contactoformulario.get('correo'); }
  get mensaje() { return this.contactoformulario.get('mensaje'); }

  // Método para enviar el formulario
  contactoForm() {
     console.log('Estado del formulario:', this.contactoformulario.invalid); // Ver el estado de "invalid"

    if (this.contactoformulario.invalid) {
      this.contactoformulario.markAllAsTouched();  // Muestra los errores si el formulario es inválido
      return;
    }
    const datos:ContactoModel=this.contactoformulario.value;
    console.log('formulario enviado',datos);

    this.serv.postInsertContacto(datos).subscribe({
      next:(response)=>{
        console.log('formulario enviado correctamente', response);
      },
      error:(err)=>{
        console.error('Error al enviar el formulario',err);
      }
    });

    
  }
}