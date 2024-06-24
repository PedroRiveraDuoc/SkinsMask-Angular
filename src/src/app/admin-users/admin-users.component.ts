import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { StorageService } from '../services/storage.service';

@Component({
  selector: 'app-admin-users',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './admin-users.component.html',
  styleUrls: ['./admin-users.component.scss']
})
export class AdminUsersComponent implements OnInit {
  users: any[] = [];

  constructor(private storageService: StorageService) {}

  ngOnInit(): void {
    this.loadUsers();
  }

  loadUsers(): void {
    if (this.storageService.isLocalStorageAvailable()) {
      this.users = JSON.parse(this.storageService.getItem('users') || '[]');
    }
  }

  deleteUser(userId: number): void {
    this.users = this.users.filter(user => user.id !== userId);
    this.storageService.setItem('users', JSON.stringify(this.users));
  }
}
