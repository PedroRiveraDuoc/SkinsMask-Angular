import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';

/**
 * ForgotPasswordComponent
 * 
 * Este componente maneja la lógica y la interfaz de usuario para la funcionalidad de recuperación de contraseñas.
 */
@Component({
  selector: 'app-forgot-password',
  standalone: true,
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.scss'],
  imports: [CommonModule, ReactiveFormsModule]
})
export class ForgotPasswordComponent implements OnInit {
  forgotPasswordForm: FormGroup;
  /**
   * Constructor del ForgotPasswordComponent.
   * 
   * @param fb FormBuilder - Inyecta FormBuilder para construir el formulario.
   * @param authService AuthService - Inyecta AuthService para manejar la lógica de autenticación.
   */
  constructor(private fb: FormBuilder, private authService: AuthService) {
    this.forgotPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }

  ngOnInit(): void {}
  /**
   * Maneja el evento de envío del formulario de recuperación de contraseña.
   * 
   * Si el formulario es válido, se llama al método resetPassword del AuthService.
   */
  onSubmit(): void {
    if (this.forgotPasswordForm.valid) {
      const email = this.forgotPasswordForm.get('email')?.value;
      this.authService.resetPassword(email).subscribe({
        next: (result) => {
          if (result) {
            alert('Se ha enviado un enlace de recuperación a su correo.');
          }
          else {
            alert('No se encontró una cuenta con el correo proporcionado.');
          }
        },
        error: (err) => {
          console.error('Error sending password reset link:', err);
        }
      });
    }
  }
}
