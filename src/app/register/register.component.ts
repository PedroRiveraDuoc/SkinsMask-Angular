import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * RegisterComponent
 * 
 * Este componente maneja el registro de nuevos usuarios.
 */
@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent {
  registerForm: FormGroup;
  /**
   * Constructor del RegisterComponent.
   * 
   * @param fb FormBuilder - Inyecta FormBuilder para crear el formulario de registro.
   * @param authService AuthService - Inyecta AuthService para manejar la lógica de autenticación.
   * @param router Router - Inyecta Router para manejar la navegación.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {
    this.registerForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  /**
   * Valida que las contraseñas coincidan.
   * 
   * @param frm FormGroup - El formulario que contiene los campos de contraseña.
   * @returns null si las contraseñas coinciden, de lo contrario un objeto con la clave 'mismatch'.
   */
  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }
  /**
   * Maneja el envío del formulario de registro.
   */
  onSubmit(): void {
    if (this.registerForm.valid) {
      const newUser = this.registerForm.value;
      delete newUser.confirmPassword; // remove confirmPassword from the user object
      this.authService.register(newUser);
      console.log('Form submitted, user registered:', newUser);
      alert('Usuario registrado con éxito');
      this.router.navigate(['/login']);
    } else {
      console.log('Form is invalid:', this.registerForm.errors);
    }
  }
}
