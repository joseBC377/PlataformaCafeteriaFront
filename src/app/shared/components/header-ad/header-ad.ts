import { Component, inject } from '@angular/core';
import { RouterLink } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-header-ad',
  imports: [RouterLink],
  templateUrl: './header-ad.html',
  styleUrl: './header-ad.css'
})
export class HeaderAd {
  public serv = inject(AuthService)
  public cerrarSesion() {
    this.serv.cerrarSesion();
  }
}
