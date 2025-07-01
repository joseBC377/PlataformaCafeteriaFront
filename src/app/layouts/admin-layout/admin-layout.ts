import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Footer } from "../../shared/components/footer/footer";
import { HeaderAd } from "../../shared/components/header-ad/header-ad";

@Component({
  selector: 'app-admin-layout',
  imports: [RouterOutlet, Footer, HeaderAd],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {

}
