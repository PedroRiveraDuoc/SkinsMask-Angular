import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';
/**
 * AdminUsersComponent
 * 
 * Este componente es responsable de mostrar y administrar los usuarios registrados.
 */
@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];
  /**
   * Constructor del AdminUsersComponent.
   * @param storageService Servicio para manejar el almacenamiento.
   */
  constructor(private storageService: StorageService) {}
  /**
   * Método de inicialización del componente. Se ejecuta al cargar el componente.
   */
  ngOnInit(): void {
    this.loadUsers();
  }
  /**
   * Carga los usuarios desde el almacenamiento y los asigna a la propiedad `users`.
   */
  loadUsers(): void {
    if (this.storageService.isLocalStorageAvailable()) {
      this.users = JSON.parse(this.storageService.getItem('users') || '[]');
    }
  }
  /**
   * Elimina un usuario basado en su índice en la lista.
   * @param index Índice del usuario a eliminar.
   */
  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.storageService.setItem('users', JSON.stringify(this.users));
  }
}
