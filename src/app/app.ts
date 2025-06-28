import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Header } from "./shared/header/header";
import { Footer } from "./shared/footer/footer";
import { Inicio } from "./pages/inicio/inicio";

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, Header, Inicio],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected title = 'PlataformaCafeteriaFront';
}
