/*
app.routes.ts: Este archivo contiene las rutas de la aplicación. 
Es aquí donde se define qué componente se debe mostrar para cada ruta de la aplicación.
*/

import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  // otras rutas
  { path: '', redirectTo: '/login', pathMatch: 'full' } // Redireccionar a login por defecto
];
