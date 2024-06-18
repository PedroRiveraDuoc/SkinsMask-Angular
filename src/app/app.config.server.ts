/*
app.config.server.ts: Este archivo contiene la configuración del servidor de la aplicación. 
Es aquí donde se configuran las rutas de la API, las credenciales de la base de datos y
otras opciones de configuración del servidor.
*/


import { mergeApplicationConfig, ApplicationConfig } from '@angular/core';
import { provideServerRendering } from '@angular/platform-server';
import { appConfig } from './app.config';

const serverConfig: ApplicationConfig = {
  providers: [
    provideServerRendering()
  ]
};

export const config = mergeApplicationConfig(appConfig, serverConfig);
