import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { finalize } from 'rxjs/operators';
import { Storage, ref, uploadBytes, getDownloadURL } from '@angular/fire/storage';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': 'Bearer fa3f16dd-5dbb-4d1d-8331-f36e395ef278'
    })
  };

  private jsonUrl = 'https://firebasestorage.googleapis.com/v0/b/skinsmask-9d73a.appspot.com/o/products.json?alt=media&token=fa3f16dd-5dbb-4d1d-8331-f36e395ef278'; 

  constructor(private http: HttpClient, private storage: Storage) {
    console.log('ProductsService constructor called');
  }

  getProducts(): Observable<any> {
    console.log('getProducts method called');
    return this.http.get(this.jsonUrl);
  }

  MetodoProductos(listaProductos: any): Observable<any> {
    console.log(listaProductos);
    return this.http.post(this.jsonUrl, listaProductos, this.httpOptions);
  }

  uploadImage(file: File): Promise<string> {
    const filePath = `products/${file.name}`;
    const storageRef = ref(this.storage, filePath);
    return uploadBytes(storageRef, file).then(() => {
      return getDownloadURL(storageRef);
    });
  }
}
