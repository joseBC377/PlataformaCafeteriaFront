import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contactanos } from './pages/contactanos/contactanos';
import { Menu } from './pages/menu/menu';
import { Login } from './pages/login/login';
import { AdminLayout } from './layouts/admin-layout/admin-layout';
import { PublicLayout } from './layouts/public-layout/public-layout';
import { PedidoComponent } from './admin/pedido/pedido';
import { Productos } from './admin/productos/productos';
import { PagosComponent } from './admin/pago/pago';
import { CategoriasComponent } from './admin/categorias/categorias';
import { Usuarios } from './admin/usuarios/usuarios';
import { Contacto } from './admin/contacto/contacto';
import { Intranet } from './admin/intranet/intranet';
import { authGuard } from './core/guards/auth-guard';


export const routes: Routes = [
  {
    path: 'admin', component: AdminLayout, canActivate: [authGuard], children: [
      { path: 'intranet', component: Intranet, title: 'Intranet' },
      { path: 'productos', component: Productos, title: 'Productos-admin' },
      { path: 'pedido', component: PedidoComponent, title: 'Pedido-admin' },
      { path: 'contacto', component: Contacto, title: 'Contactanos-admin' },
      { path: 'usuario', component: Usuarios, title: 'Usuarios-admin' },
      { path: 'pago', component: PagosComponent, title: 'Pago-admin' },
      { path: 'categorias', component: CategoriasComponent, title: 'Categorias-admin' }
    ]
  },
  {
    path: '', component: PublicLayout, children: [
      { path: 'nosotros', component: Nosotros, title: 'nosotros' },
      { path: 'contactanos', component: Contactanos, title: 'contactanos' },
      { path: 'menu', component: Menu, title: 'Menu' },
      { path: 'login', component: Login, title: 'login' },
      { path: '', component: Inicio, title: 'inicio' },
      { path: '**', component: Error, title: "Pagina de error"}
    ]
  }
];
