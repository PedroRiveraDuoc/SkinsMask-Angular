import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-admin-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-orders.component.html',
  styleUrls: ['./admin-orders.component.scss']
})
export class AdminOrdersComponent implements OnInit {
  orders: any[] = [];

  constructor(private storageService: StorageService) { }

  ngOnInit(): void {
    this.loadOrders();
  }

  loadOrders(): void {
    if (this.storageService.isLocalStorageAvailable()) {
      const storedOrders = JSON.parse(this.storageService.getItem('orders') || '[]');
      this.orders = storedOrders.map((order: any) => ({
        ...order,
        user: this.getUserInfo(order.user)
      }));
    }
  }

  private getUserInfo(userEmail: string): any {
    const users = JSON.parse(this.storageService.getItem('users') || '[]');
    return users.find((user: any) => user.email === userEmail);
  }
}
