import { Component, inject, OnInit, OnDestroy, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Storage, listAll, getDownloadURL, ref, uploadBytesResumable } from '@angular/fire/storage';
import { Subscription, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

/**
 * ProductsComponent
 * 
 * Este componente maneja la visualización de los productos y permite agregar
 * productos al carrito de compras.
 */
// Interfaz que define la estructura de un producto

type ImageStorage = {
  name: string;
  url: string;
};


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, HttpClientModule, FormsModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]  // Asegurarse de que el servicio esté disponible
})
export default class ProductsComponent implements OnInit, OnDestroy {
  // Arreglo para almacenar los productos
  products: Product[] = [];
  // Objeto para manejar el formulario de productos
  productForm: any = {
    id: null,
    name: '',
    description: '',
    price: null,
    imageUrl: ''
  };
  // Bandera para determinar si el modo de edición está activo
  isEditMode: boolean = false;

  private readonly storage = inject(Storage);
  images = signal<ImageStorage[]>([]);
  private destroy$ = new Subject<void>();

  // Constructor que inyecta los servicios de carrito y productos
  constructor(private cartService: CartService, private productsService: ProductsService) {
    console.log('ProductsComponent constructor called');
  }

  // Método de inicialización que carga los productos al iniciar el componente
  async ngOnInit(): Promise<void> {
    const reference = ref(this.storage, 'products');
    const images = await listAll(reference);

    for (const image of images.items) {
      const newImage = await getDownloadURL(image);
      this.images.update((oldImages) => {
        return [...oldImages, { name: image.name, url: newImage }];
      
      });
    }

    console.log(this.images());



    console.log('ProductsComponent ngOnInit called');
    this.loadProducts();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  // Método para cargar los productos desde el archivo JSON
  loadProducts(): void {
    console.log('loadProducts method called');
    this.productsService.getProducts()
      .pipe(takeUntil(this.destroy$))
      .subscribe(
        (data: Product[]) => {
          console.log('Products loaded from JSON:', data);
          this.products = data;
        },
        error => {
          console.error('Error loading products from JSON:', error);
        }
      );
  }

  // Método para cargar los datos de un producto en el formulario y activar el modo de edición
  modificar(producto: Product): void {
    this.productForm = { ...producto };
    this.isEditMode = true;
  }

  // Método para eliminar un producto de la lista y actualizar el archivo JSON
  eliminar(producto: Product): void {
    const index = this.products.findIndex((p: Product) => p.id === producto.id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsService.MetodoProductos(this.products);
    } else {
      window.alert('Error al eliminar producto:');
    }
  }

  // Método para agregar un producto al carrito
  addProductToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }

  // Método para enviar el formulario, agrega o actualiza un producto en la lista y en el archivo JSON
  submitForm(): void {
    console.log('Form submitted');
    if (this.isEditMode) {
      // Si está en modo de edición, actualiza el producto existente
      const index = this.products.findIndex((p: Product) => p.id === this.productForm.id);
      if (index !== -1) {
        this.products[index] = { ...this.productForm };
        this.productsService.MetodoProductos(this.products);
        this.isEditMode = false;
      }
    } else {
      // Si no está en modo de edición, agrega un nuevo producto
      const newProduct: Product = {
        id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
        name: this.productForm.name,
        description: this.productForm.description,
        price: this.productForm.price,
        imageUrl: this.productForm.imageUrl
      };
      this.products.push(newProduct);
      this.productsService.MetodoProductos(this.products);
    }
    // Resetea el formulario
    this.productForm = {
      id: null,
      name: '',
      description: '',
      price: null,
      imageUrl: ''
    };
  }

  file!: File;

  changeInput(event: Event): void {
    console.log(this.storage);
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      this.uploadFile();
    }
  }

  uploadFile(): void {
    const storageRef = ref(this.storage, `products/${this.file.name}`);
    uploadBytesResumable(storageRef, this.file);
  }
}
