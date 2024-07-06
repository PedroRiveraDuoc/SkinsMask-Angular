import { Component, inject, OnInit, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';

/**
 * ProductsComponent
 * 
 * Este componente maneja la visualización de los productos y permite agregar
 * productos al carrito de compras.
 */
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
  providers: [ProductsService]
})
export default class ProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: any = {
    id: null,
    name: '',
    description: '',
    price: null,
    imageUrl: ''
  };
  isEditMode: boolean = false;
  file!: File;
  imagePreview: string | ArrayBuffer | null = null;

  private readonly storage = inject(Storage);

  constructor(private cartService: CartService, private productsService: ProductsService) {
    console.log('ProductsComponent constructor called');
  }

  async ngOnInit(): Promise<void> {
    console.log('ProductsComponent ngOnInit called');
    this.loadProducts();
  }

  loadProducts(): void {
    console.log('loadProducts method called');
    this.productsService.getProducts().subscribe(
      (data: Product[]) => {
        console.log('Products loaded from JSON:', data);
        this.products = data;
      },
      error => {
        console.error('Error loading products from JSON:', error);
      }
    );
  }

  modificar(producto: Product): void {
    this.productForm = { ...producto };
    this.isEditMode = true;
  }

  eliminar(producto: Product): void {
    const index = this.products.findIndex((p: Product) => p.id === producto.id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsService.MetodoProductos(this.products).subscribe(
        response => console.log('Producto eliminado', response),
        error => console.error('Error al eliminar producto', error)
      );
    } else {
      window.alert('Error al eliminar producto:');
    }
  }

  addProductToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }

  changeInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files) {
      this.file = input.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        this.imagePreview = reader.result;
      };
      reader.readAsDataURL(this.file);
    }
  }

  submitForm(): void {
    console.log('Form submitted');
    if (this.file) {
      this.productsService.uploadImage(this.file).subscribe(
        (downloadURL: string) => {
          this.productForm.imageUrl = downloadURL;
          this.saveProduct();
        },
        error => {
          console.error('Error uploading image:', error);
        }
      );
    } else {
      this.saveProduct();
    }
  }

  saveProduct(): void {
    if (this.isEditMode) {
      const index = this.products.findIndex((p: Product) => p.id === this.productForm.id);
      if (index !== -1) {
        this.products[index] = { ...this.productForm };
        this.productsService.MetodoProductos(this.products).subscribe(
          response => {
            console.log('Producto modificado', response);
            this.isEditMode = false;
            this.resetForm();
          },
          error => {
            console.error('Error al modificar producto', error);
          }
        );
      }
    } else {
      const newProduct: Product = {
        id: this.products.length > 0 ? Math.max(...this.products.map(p => p.id)) + 1 : 1,
        name: this.productForm.name,
        description: this.productForm.description,
        price: this.productForm.price,
        imageUrl: this.productForm.imageUrl
      };
      this.products.push(newProduct);
      this.productsService.MetodoProductos(this.products).subscribe(
        response => {
          console.log('Producto agregado', response);
          this.resetForm();
        },
        error => {
          console.error('Error al agregar producto', error);
        }
      );
    }
  }

  resetForm(): void {
    this.productForm = {
      id: null,
      name: '',
      description: '',
      price: null,
      imageUrl: ''
    };
    this.imagePreview = null;
  }
}
