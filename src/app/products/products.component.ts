import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
import { ProductsService } from '../services/products.service';
import { HttpClientModule } from '@angular/common/http';

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
  imports: [CommonModule, HttpClientModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss'],
  providers: [ProductsService]  // Asegurarse de que el servicio esté disponible
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];

  /**
   * Constructor del ProductsComponent.
   * 
   * @param cartService CartService - Inyecta CartService para manejar la lógica del carrito de compras.
   * @param productsService ProductsService - Inyecta ProductsService para manejar la lógica de productos.
   */
  constructor(private cartService: CartService, private productsService: ProductsService) {
    console.log('ProductsComponent constructor called');
  }

  /**
   * Carga los productos al inicializar el componente.
   */
  ngOnInit(): void {
    console.log('ProductsComponent ngOnInit called');
    this.loadProducts();
  }

  /**
   * Obtiene los productos desde el servicio.
   */
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

  /**
   * Agrega un producto al carrito de compras.
   * 
   * @param product Product - El producto que se va a agregar al carrito.
   */
  addToCart(product: Product): void {
    console.log('Adding product to cart:', product);
    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }
}
