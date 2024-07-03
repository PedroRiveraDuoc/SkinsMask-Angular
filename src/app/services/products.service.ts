import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

/**
 * ProductsService
 * 
 * Servicio para manejar la lógica de productos, incluyendo la obtención y manejo de datos desde un archivo JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  private jsonUrl = 'assets/products.json'; // URL local del archivo JSON

  constructor(private http: HttpClient) {
    console.log('ProductsService constructor called');
  }

  /**
   * Obtiene los datos de productos desde el archivo JSON.
   * 
   * @returns Observable<any> - Un observable con los datos del archivo JSON.
   */
  getProducts(): Observable<any> {
    console.log('getProducts method called');
    return this.http.get(this.jsonUrl);
  }

  /**
   * Sobrescribe los datos del archivo JSON con nuevos datos.
   * 
   * @param listaProductos any - Los datos que se van a escribir en el archivo JSON.
   */
  saveProducts(listaProductos: any): void {
    console.log('saveProducts method called with data:', listaProductos);
    const httpOptions = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json'
      })
    };

    this.http.post(this.jsonUrl, listaProductos, httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con éxito', response);
      },
      error => {
        console.error('Error al sobrescribir el archivo JSON', error);
      }
    );
  }
}
