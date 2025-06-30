import { CurrencyPipe, NgClass } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-menu',
  imports: [NgClass, CurrencyPipe],
  templateUrl: './menu.html',
  styleUrl: './menu.css'
})
export class Menu {
  isActive: number = 0;
  setActive(item: number) {
    this.isActive = item;
  }
  isCircle: number = 0;
  setCircle(item: number) {
    this.isCircle = item;
  }
  mostrarElemento: boolean = false;
  toggleModal(): void {
    this.mostrarElemento = !this.mostrarElemento;
    console.log('El modal está visible:', this.mostrarElemento);
  }

}
