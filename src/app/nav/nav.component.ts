import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-nav',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss'],
})
export class NavComponent implements OnInit, OnDestroy {
  isAuthenticated: boolean = false;
  username: string | null = null;
  private subscription: Subscription | null = null;

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.subscription = this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user !== null ? user.firstName : null;
      console.log('User state updated:', {
        isAuthenticated: this.isAuthenticated,
        username: this.username
      });
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout():
    void {
    this.authService.logout();
  }
}
