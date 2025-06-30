import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inicio',
  imports: [],
  templateUrl: './inicio.html',
  styleUrl: './inicio.css'
})
export class Inicio {
  constructor(private router:Router){
  }
  navegacion():void{
    this.router.navigate(['/menu'])
  }
  navegacion2():void{
    this.router.navigate(['/contactanos'])
  }
}
