import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * LoginComponent
 * 
 * Este componente maneja la lógica y la interfaz de usuario para la funcionalidad de inicio de sesión.
 */
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  loginForm: FormGroup;
  /**
   * Constructor del LoginComponent.
   * 
   * @param fb FormBuilder - Inyecta FormBuilder para construir el formulario.
   * @param authService AuthService - Inyecta AuthService para manejar la lógica de autenticación.
   * @param router Router - Inyecta Router para manejar la navegación.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }
  /**
   * Maneja el evento de envío del formulario de inicio de sesión.
   * 
   * Si el formulario es válido, se llama al método login del AuthService.
   * Si las credenciales son correctas, redirige al usuario a la página de inicio.
   * Si las credenciales son incorrectas, muestra una alerta.
   */
  onSubmit(): void {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (this.authService.login(email, password)) {
        console.log('Login successful for user:', email);
        this.router.navigate(['/']);
      } else {
        console.log('Login failed for user:', email);
        alert('Credenciales incorrectas');
      }
    } else {
      console.log('Form is invalid:', this.loginForm.errors);
    }
  }
}
