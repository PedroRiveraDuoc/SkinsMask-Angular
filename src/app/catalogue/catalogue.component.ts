import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ProductsService } from '../services/products.service';
import { CartService } from '../services/cart.service';
import { HttpClientModule } from '@angular/common/http';


interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
}

@Component({
  selector: 'app-catalogue',
  standalone: true,
  imports: [CommonModule, HttpClientModule],
  templateUrl: './catalogue.component.html',
  styleUrls: ['./catalogue.component.scss'],
  providers: [ProductsService, CartService]
})
export class CatalogueComponent implements OnInit {
  products: Product[] = [];

  constructor(private productsService: ProductsService, private cartService: CartService) {}

  ngOnInit(): void {
    this.loadProducts();
  }

  loadProducts(): void {
    this.productsService.getProducts().subscribe(
      (data: Product[]) => {
        this.products = data;
      },
      error => {
        console.error('Error loading products from JSON:', error);
      }
    );
  }

  addProductToCart(product: Product): void {
    this.cartService.addToCart(product);
    alert('Producto agregado al carrito');
  }

  formatPrice(price: number): string {
    return `$${price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.')}`;
  }

  trackByFn(index: number, product: Product): number {
    return product.id;
  }
}


