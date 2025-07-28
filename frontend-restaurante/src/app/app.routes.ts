import { Routes } from '@angular/router';
import { PratosListComponent } from './pages/pratos-list/pratos-list';
import { ClientesListComponent } from './pages/clientes-list/clientes-list';
import { PedidosCreateComponent } from './pages/pedidos-create/pedidos-create';
import { RelatoriosComponent } from './pages/relatorios/relatorios';

export const routes: Routes = [
  { path: 'pratos', component: PratosListComponent },
  { path: 'clientes', component: ClientesListComponent },
  { path: 'pedidos/novo', component: PedidosCreateComponent },
  { path: 'relatorios', component: RelatoriosComponent },
  { path: '', redirectTo: '/pratos', pathMatch: 'full' },
];
