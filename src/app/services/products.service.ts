import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { response } from 'express';

/**
 * ProductsService
 * 
 * Servicio para manejar la lógica de productos, incluyendo la obtención y manejo de datos desde un archivo JSON.
 */
@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer 39ad5402-8865-43a9-b5ac-f151db8a3394'
    })
  };

  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/skinsmask-baa17.appspot.com/o/products.json?alt=media&token=39ad5402-8865-43a9-b5ac-f151db8a3394'; // URL archivo JSON Firebase


  private lista: any;

  constructor(private http: HttpClient) {
    console.log('ProductsService constructor called');
  }


  getProducts(): Observable<any> {
    console.log('getProducts method called');
    return this.http.get(this.jsonUrl);
  }

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
