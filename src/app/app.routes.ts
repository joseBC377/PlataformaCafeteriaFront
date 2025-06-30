import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contactanos } from './pages/contactanos/contactanos';
import { Menu } from './pages/menu/menu';


export const routes: Routes = [
  { path: '', component: Inicio, title: 'inicio' },
  { path: 'nosotros', component: Nosotros, title: 'nosotros' },
  { path: 'contactanos', component: Contactanos, title: 'contactanos' },
  { path: 'menu', component: Menu, title: 'Menu' }
];
