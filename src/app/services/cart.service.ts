import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
/**
 * Servicio de carrito de compras.
 * 
 * Este servicio maneja la lógica del carrito de compras, incluyendo la adición,
 * eliminación y limpieza de artículos en el carrito.
 */
@Injectable({
  providedIn: 'root'
})
export class CartService {
  private cartItemsSubject = new BehaviorSubject<any[]>([]);
  cartItems$ = this.cartItemsSubject.asObservable();
    /**
     * Constructor del CartService.
     * 
     * @param storageService StorageService - Servicio de almacenamiento para manejar datos en localStorage.
     */
  constructor() {
    if (typeof localStorage !== 'undefined') {
      const storedCartItems = JSON.parse(localStorage.getItem('cartItems') || '[]');
      this.cartItemsSubject.next(storedCartItems);
    }
  }
    /**
     * Agrega un artículo al carrito.
     * 
     * @param item any - El artículo que se va a agregar al carrito.
     */
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
    /**
     * Elimina un artículo del carrito.
     * 
     * @param itemId number - El ID del artículo que se va a eliminar del carrito.
     */
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
    /**
     * Limpia todos los artículos del carrito.
     */
  clearCart(): void {
    this.cartItemsSubject.next([]);
    if (typeof localStorage !== 'undefined') {
      localStorage.setItem('cartItems', JSON.stringify([]));
    }
    console.log('Cart cleared');
  }
    /**
     * Obtiene el total de artículos en el carrito.
     * 
     * @returns number - El número total de artículos en el carrito.
     */
  getTotal(): number {
    return this.cartItemsSubject.value.reduce((total, item) => total + item.product.price * item.quantity, 0);
  }
}
