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

  // Opciones HTTP que incluyen cabeceras necesarias para la autorización y tipo de contenido
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 39ad5402-8865-43a9-b5ac-f151db8a3394'
    })
  };
  // URL del archivo JSON en Firebase
  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/skinsmask-baa17.appspot.com/o/products.json?alt=media&token=39ad5402-8865-43a9-b5ac-f151db8a3394'; // URL archivo JSON Firebase

  // Variable para almacenar la lista de productos
  private lista: any;
  
  // Constructor que inyecta HttpClient y muestra un mensaje en la consola cuando se instancia el servicio
  constructor(private http: HttpClient) {
    console.log('ProductsService constructor called');
  }



  /**
   * Método para obtener los productos desde el archivo JSON.
   * 
   * @returns Observable que emite la lista de productos.
   */
  getProducts(): Observable<any> {
    console.log('getProducts method called');
    return this.http.get(this.jsonUrl);
  }


  
  /**
   * Método para sobrescribir el archivo JSON con una nueva lista de productos.
   * 
   * @param listaProductos - La nueva lista de productos que se va a guardar en el archivo JSON.
   */
  MetodoProductos(listaProductos: any) {
    console.log(listaProductos);
    this.http.post(this.jsonUrl, listaProductos, this.httpOptions).subscribe(
      response => {
        console.log('Archivo JSON sobrescrito con exito', response);
      },
      error => {
        console.log('Error al sobrescribir archivo JSON', error);
      })
      
  }

}
