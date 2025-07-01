import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-contactanos',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './contacto.html',
  styleUrl: './contacto.css'
})
export class ContactanosComponent {
  contactos = [
    {
      id_contacto: 1,
      nombre: 'Ana Torres',
      correo: 'ana@mail.com',
      telefono: '912345678',
      mensaje: '¿Puedo reservar una mesa para mañana a las 5pm?'
    },
    {
      id_contacto: 2,
      nombre: 'Pedro Salazar',
      correo: 'pedro@mail.com',
      telefono: '987654321',
      mensaje: '¿Qué métodos de pago aceptan en la cafetería?'
    },
    {
      id_contacto: 3,
      nombre: 'Lucía Gamarra',
      correo: 'lucia@mail.com',
      telefono: '934567890',
      mensaje: 'Estoy interesada en hacer un evento privado.'
    }
  ];

  eliminarContacto(id: number) {
    this.contactos = this.contactos.filter(c => c.id_contacto !== id);
  }
}
