import { Routes } from '@angular/router';
import { PratosListComponent } from './pages/pratos-list/pratos-list';
import { ClientesListComponent } from './pages/clientes-list/clientes-list';

export const routes: Routes = [
  { path: 'pratos', component: PratosListComponent },
  { path: 'clientes', component: ClientesListComponent },
  { path: '', redirectTo: '/pratos', pathMatch: 'full' },
];