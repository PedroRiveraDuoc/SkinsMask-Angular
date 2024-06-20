/*
app.routes.ts: Este archivo contiene las rutas de la aplicación. 
Es aquí donde se define qué componente se debe mostrar para cada ruta de la aplicación.
*/

import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { LoginComponent } from './login/login.component';
import { ProductsComponent } from './products/products.component';

export const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductsComponent },
  // otras rutas
  { path: '', redirectTo: '/home', pathMatch: 'full' } // Redireccionar a login por defecto
];
