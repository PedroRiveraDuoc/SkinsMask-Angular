import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

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
  providers: [ProductsService]  // Asegurarse de que el servicio esté disponible
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  productForm: any = {
    id: null,
    name: '',
    description: '',
    price: null,
    imageUrl: ''
  };
  isEditMode: boolean = false;

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
  }

  eliminar(producto: Product): void {
    const index = this.products.findIndex((p: Product) => p.id === producto.id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.productsService.MetodoProductos(this.products);
    } else {
      window.alert('Error al eliminar producto:');
    }
  }

  addProductToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }

  submitForm(): void {
    console.log('Form submitted');
    if (this.isEditMode) {
      const index = this.products.findIndex((p: Product) => p.id === this.productForm.id);
      if (index !== -1) {
        this.products[index] = { ...this.productForm };
        this.productsService.MetodoProductos(this.products);
        this.isEditMode = false;
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
      this.productsService.MetodoProductos(this.products);
    }
    this.productForm = {
      id: null,
      name: '',
      description: '',
      price: null,
      imageUrl: ''
    };
  }
}
