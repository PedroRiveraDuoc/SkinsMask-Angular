import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];

  constructor(private cartService: CartService) {}

  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log('Items in cart:', this.cartItems);
    });
  }

  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
  }

  clearCart(): void {
    this.cartService.clearCart();
    console.log('Carrito limpiado');
  }

  getTotal(): number {
    return this.cartService.getTotal();
  }

  checkout(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const orderNumber = Math.floor(1000 + Math.random() * 9000);

    const order = {
      orderNumber: orderNumber,
      user: currentUser.email || 'guest',
      items: this.cartItems,
      totalAmount: this.getTotal(),
      date: new Date().toLocaleString()
    };

    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    storedOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    this.clearCart();
    console.log('Order saved:', order);
  }
}
