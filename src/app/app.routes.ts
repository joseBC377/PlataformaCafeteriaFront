import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contactanos } from './pages/contactanos/contactanos';
import { Menu } from './pages/menu/menu';
import { Login } from './pages/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { Productos } from './admin/productos/productos';
import { PedidoComponent } from './admin/pedido/pedido';
import { ContactanosComponent } from './admin/contacto/contacto';
import { PagosComponent } from './admin/pago/pago';
import { UsuarioComponent } from './admin/usuarios/usuarios';
import { CategoriasComponent } from './admin/categorias/categorias';

export const routes: Routes = [
  {
    path: 'admin', component: AdminLayout, children: [
      { path: 'productos', component: Productos, title: 'Productos-admin' },
      { path: 'pedido', component: PedidoComponent, title: 'Pedido-admin' },
      { path: 'contacto', component: ContactanosComponent, title: 'Contactanos-admin' },
      { path: 'usuario', component: UsuarioComponent, title: 'Usuarios-admin' },
      { path: 'pago', component: PagosComponent, title: 'Pago-admin' },
      { path: 'categorias', component: CategoriasComponent, title: 'Categorias-admin' }
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
