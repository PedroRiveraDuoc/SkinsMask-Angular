import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { Subscription } from 'rxjs';
/**
 * NavComponent
 * 
 * Este componente maneja la barra de navegación de la aplicación,
 * mostrando el estado de autenticación del usuario y proporcionando
 * opciones de navegación.
 */
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
  /**
   * Constructor del NavComponent.
   * 
   * @param authService AuthService - Inyecta AuthService para manejar la lógica de autenticación.
   */
  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.authService.currentUser$.subscribe(user => {
      this.isAuthenticated = !!user;
      this.username = user ? user.firstName : null;
    });
  }

  /**
   * Método de ciclo de vida de Angular que se ejecuta al destruir el componente.
   * 
   * Cancela la suscripción al Observable currentUser$ para evitar pérdidas de memoria.
   */
  ngOnDestroy(): void {
    this.subscription?.unsubscribe();
  }
  /**
   * Maneja el evento de cierre de sesión del usuario.
   * 
   * Llama al método logout del AuthService para cerrar la sesión del usuario.
   */
  logout(): void {
    this.authService.logout();
  }
}
