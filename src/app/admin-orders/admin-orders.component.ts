import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';

/**
 * Componente para la administración de órdenes.
 * Este componente muestra la lista de órdenes almacenadas en el localStorage.
 */
@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  /**
 * Lista de órdenes obtenidas del localStorage.
 */
  orders: any[] = [];
  /**
   * Constructor del componente AdminOrdersComponent.
   * @param storageService Servicio para interactuar con el localStorage.
   */
  constructor(private storageService: StorageService) { }
  /**
   * Método de ciclo de vida de Angular llamado después de la inicialización del componente.
   * Carga las órdenes desde el localStorage.
   */
  ngOnInit(): void {
    this.loadOrders();
  }
  /**
   * Carga las órdenes almacenadas en el localStorage y las mapea para incluir la información del usuario.
   */
  loadOrders(): void {
    if (this.storageService.isLocalStorageAvailable()) {
      const storedOrders = JSON.parse(this.storageService.getItem('orders') || '[]');
      this.orders = storedOrders.map((order: any) => ({
        ...order,
        user: this.getUserInfo(order.user)
      }));
    }
  }
  /**
   * Obtiene la información del usuario basado en su ID.
   * @param userId ID del usuario.
   * @returns Información del usuario.
   */
  
  private getUserInfo(userEmail: string): any {
    const users = JSON.parse(this.storageService.getItem('users') || '[]');
    return users.find((user: any) => user.email === userEmail);
  }
}
