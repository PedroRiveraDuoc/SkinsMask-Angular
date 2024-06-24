import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CartService } from '../services/cart.service';
/**
 * CartComponent
 * 
 * Este componente es responsable de mostrar y manejar el carrito de compras.
 */
@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent implements OnInit {
  cartItems: any[] = [];
  /**
   * Constructor del CartComponent.
   * @param storageService Servicio para manejar el almacenamiento.
   * @param router Servicio de navegación.
   */
  constructor(private cartService: CartService) {}
  /**
   * Método de inicialización del componente. Se ejecuta al cargar el componente.
   */
  ngOnInit(): void {
    this.cartService.cartItems$.subscribe(items => {
      this.cartItems = items;
      console.log('Items in cart:', this.cartItems);
    });
  }
/**
  * Método para remover un producto del carrito.
 * @param product 
 */
  removeFromCart(product: any): void {
    this.cartService.removeFromCart(product);
  }
/**
 * Método para limpiar el carrito.
 */
  clearCart(): void {
    this.cartService.clearCart();
    console.log('Carrito limpiado');
  }
/**
 * 
 * @returns   Retorna el total de la compra.
 */
  getTotal(): number {
    return this.cartService.getTotal();
  }

  /**
   * Navega a la página de checkout.
   */
  checkout(): void {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const orderNumber = Math.floor(1000 + Math.random() * 9000);
/**
 * Objeto que representa la orden.
 * @type {{orderNumber: number; user: string; items: any[]; totalAmount: number; date: string}}
 * @const order
 * @returns Retorna la orden. 
 * @param orderNumber
 * @param currentUser
 * @param items
* @param totalAmount
 */
    const order = {
      orderNumber: orderNumber,
      user: currentUser.email || 'guest',
      items: this.cartItems,
      totalAmount: this.getTotal(),
      date: new Date().toLocaleString()
    };

    /**
     * Guarda la orden en el almacenamiento local.
     */
    const storedOrders = JSON.parse(localStorage.getItem('orders') || '[]');
    storedOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(storedOrders));

    this.clearCart();
    console.log('Order saved:', order);
  }
}
