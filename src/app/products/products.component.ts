import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { Storage } from '@angular/fire/storage';

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
  file: File | null = null;
  loading: boolean = false;
  successMessage: string = '';
  imagePreview: string | ArrayBuffer | null = null;

  private readonly storage = inject(Storage);

  constructor(private cartService: CartService, private productsService: ProductsService) {
    console.log('ProductsComponent constructor called');
  }

  ngOnInit(): void {
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
    this.imagePreview = producto.imageUrl;
  }

  eliminar(producto: Product): void {
    const index = this.products.findIndex((p: Product) => p.id === producto.id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsService.MetodoProductos(this.products).subscribe(
        response => {
          console.log('Producto eliminado', response);
          this.loadProducts();
        },
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
      reader.onload = (e) => {
        this.imagePreview = e.target?.result as string | ArrayBuffer | null;
      };
      reader.readAsDataURL(this.file);
    }
  }

  submitForm(): void {
    this.loading = true;
    if (this.file) {
      this.productsService.uploadImage(this.file).then(
        (downloadURL: string) => {
          this.productForm.imageUrl = downloadURL;
          this.saveProduct();
        },
        error => {
          console.error('Error uploading image:', error);
          this.loading = false;
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
            this.showSuccessMessage('Producto modificado con éxito');
            this.loadProducts(); // Reload products to reflect changes
          },
          error => {
            console.error('Error al modificar producto', error);
            this.loading = false;
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
          this.showSuccessMessage('Producto agregado con éxito');
          this.loadProducts(); // Reload products to reflect changes
        },
        error => {
          console.error('Error al agregar producto', error);
          this.loading = false;
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
    this.file = null;
    this.imagePreview = null;
    this.loading = false;
  }

  showSuccessMessage(message: string): void {
    this.successMessage = message;
    setTimeout(() => {
      this.successMessage = '';
    }, 3000);
  }
}
