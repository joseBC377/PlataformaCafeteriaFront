import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contactanos } from './pages/contactanos/contactanos';
import { Menu } from './pages/menu/menu';
import { Productos } from './admin/productos/productos';


export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'nosotros', component: Nosotros },
  { path: 'contactanos', component: Contactanos },
  {path:'menu', component:Menu, title:'Menu'},
  {path:'admin/productos', component:Productos, title:'Productos-admin'}
];
