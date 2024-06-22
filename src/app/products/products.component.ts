import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

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
  imports: [CommonModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products: Product[] = [
    { id: 1, name: 'Black Gold Calligraphy', description: 'Descripción breve del producto.', price: 149990, imageUrl: 'assets/post/black-gold-calligraphy.jpg' },
    { id: 2, name: 'Black Half Mask', description: 'Descripción breve del producto.', price: 59990, imageUrl: 'assets/post/black-half-mask.png' },
    { id: 3, name: 'Blue Demon', description: 'Descripción breve del producto.', price: 159990, imageUrl: 'assets/post/blue-demon.png' },
    { id: 4, name: 'Ghost', description: 'Descripción breve del producto.', price: 129990, imageUrl: 'assets/post/ghost.png' },
    { id: 5, name: 'Red Hannya', description: 'Descripción breve del producto.', price: 139990, imageUrl: 'assets/post/red-hannya.png' }
  ];

  constructor(private cartService: CartService) {}

  addToCart(product: Product): void {
    this.cartService.addToCart(product);
  }
}
