import { Injectable } from '@angular/core';
/**
 * Servicio de almacenamiento.
 * 
 * Este servicio maneja la lógica para interactuar con el almacenamiento local
 * del navegador (localStorage).
 */
@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor() {}
    /**
     * Obtiene un valor del localStorage.
     * 
     * @param key string - La clave del valor que se quiere obtener.
     * @returns string | null - El valor almacenado o null si no se encuentra.
     */
  getItem(key: string): string | null {
    if (this.isLocalStorageAvailable()) {
      return localStorage.getItem(key);
    }
    return null;
  }
    /**
     * Almacena un valor en el localStorage.
     * 
     * @param key string - La clave con la que se va a almacenar el valor.
     * @param value string - El valor que se va a almacenar.
     */
  setItem(key: string, value: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.setItem(key, value);
    }
  }
    /**
     * Elimina un valor del localStorage.
     * 
     * @param key string - La clave del valor que se quiere eliminar.
     */
  removeItem(key: string): void {
    if (this.isLocalStorageAvailable()) {
      localStorage.removeItem(key);
    }
  }

  isLocalStorageAvailable(): boolean {
    try {
      const testKey = '__test__';
      localStorage.setItem(testKey, 'test');
      localStorage.removeItem(testKey);
      return true;
    } catch (e) {
      return false;
    }
  }
}
