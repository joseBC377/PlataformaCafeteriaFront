import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contactanos } from './pages/contactanos/contactanos';
import { Menu } from './pages/menu/menu';
import { Login } from './pages/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { PublicLayout } from './layouts/public-layout/public-layout';


export const routes: Routes = [

  {
    path: 'admin', component: AdminLayout, children: [

    ]
  },
  {
    path: '', component: PublicLayout, children: [
      { path: '', component: Inicio, title: 'inicio' },
      { path: 'nosotros', component: Nosotros, title: 'nosotros' },
      { path: 'contactanos', component: Contactanos, title: 'contactanos' },
      { path: 'menu', component: Menu, title: 'Menu' },
      { path: 'login', component: Login, title: 'login' }
    ]
  }
];
