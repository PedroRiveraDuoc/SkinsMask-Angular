import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();

  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.cartItemsSubject.next(storedCartItems);
    }
  }

  addToCart(product: any): void {
    const currentCartItems = this.cartItemsSubject.value;
    const existingProduct = currentCartItems.find(item => item.product.id === product.id);

    if (existingProduct) {
      existingProduct.quantity += 1;
    } else {
      currentCartItems.push({ product, quantity: 1 });
    }

    this.cartItemsSubject.next(currentCartItems);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
    }
    console.log('Product added to cart:', product);
  }

  removeFromCart(product: any): void {
    let currentCartItems = this.cartItemsSubject.value;
    const existingProduct = currentCartItems.find(item => item.product.id === product.id);

    if (existingProduct && existingProduct.quantity > 1) {
      existingProduct.quantity -= 1;
    } else {
      currentCartItems = currentCartItems.filter(item => item.product.id !== product.id);
    }

    this.cartItemsSubject.next(currentCartItems);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify(currentCartItems));
    }
    console.log('Product removed from cart:', product);
  }

  clearCart(): void {
    this.cartItemsSubject.next([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    console.log('Cart cleared');
  }

  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
