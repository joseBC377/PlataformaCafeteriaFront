import { Routes } from '@angular/router';
import { Inicio } from './pages/inicio/inicio';
import { Nosotros } from './pages/nosotros/nosotros';
import { Contactanos } from './pages/contactanos/contactanos';
import { Menu } from './pages/menu/menu';
import { Productos } from './admin/productos/productos';
import { PedidoComponent } from './admin/pedido/pedido';
import { ContactanosComponent } from './admin/contacto/contacto';
import { PagosComponent } from './admin/pago/pago';
import { UsuarioComponent } from './admin/usuarios/usuarios';
import { CategoriasComponent } from './admin/categorias/categorias';

export const routes: Routes = [
  { path: '', component: Inicio },
  { path: 'nosotros', component: Nosotros },
  { path: 'contactanos', component: Contactanos },
  { path: 'menu', component: Menu, title: 'Menu' },
  { path: 'admin/productos', component: Productos, title: 'Productos-admin' },
  { path: 'admin/pedido', component: PedidoComponent, title: 'Pedido-admin' },
  { path: 'admin/contacto', component: ContactanosComponent, title: 'Contactanos-admin' },
  { path: 'admin/usuario', component: UsuarioComponent, title: 'Usuarios-admin' },
  { path: 'admin/pago', component: PagosComponent, title: 'Pago-admin' },
  { path: 'admin/categorias', component: CategoriasComponent, title: 'Categorias-admin' },
];
