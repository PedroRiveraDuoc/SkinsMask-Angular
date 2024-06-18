/*
app.routes.ts: Este archivo contiene las rutas de la aplicación. 
Es aquí donde se define qué componente se debe mostrar para cada ruta de la aplicación.
*/

import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';

export const routes: Routes = [
  { path: 'register', component: RegisterComponent },
  // Otras rutas si es necesario
];
