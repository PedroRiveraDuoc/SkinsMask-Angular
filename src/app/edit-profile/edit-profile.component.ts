import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { StorageService } from '../services/storage.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
/**
 * EditProfileComponent
 * 
 * Este componente maneja la funcionalidad de edición de perfil del usuario.
 */
@Component({
  selector: 'app-edit-profile',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
  profileForm: FormGroup;
  currentUser: any;
  /**
   * Constructor del EditProfileComponent.
   * @param formBuilder Servicio para construir formularios.
   * @param authService Servicio de autenticación.
   * @param router Servicio de navegación.
   */
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private storageService: StorageService,
    private router: Router
  ) {
    this.profileForm = this.fb.group({
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]],
      confirmPassword: ['', Validators.required]
    }, { validator: this.passwordMatchValidator });
  }
  /**
   * Método de inicialización del componente. Se ejecuta al cargar el componente.
   */
  ngOnInit(): void {
    this.currentUser = this.authService.getCurrentUser();
    if (this.currentUser) {
      this.profileForm.patchValue(this.currentUser);
    }
  }

  passwordMatchValidator(frm: FormGroup) {
    return frm.controls['password'].value === frm.controls['confirmPassword'].value
      ? null : { 'mismatch': true };
  }
  /**
   * Método para manejar el envío del formulario.
   */
  onSubmit(): void {
    if (this.profileForm.valid) {
      const updatedUser = this.profileForm.value;
      updatedUser.id = this.currentUser.id; // Ensure the ID is maintained
      delete updatedUser.confirmPassword; // remove confirmPassword from the user object
      this.authService.updateUser(updatedUser);
      alert('Perfil actualizado con éxito');
      this.router.navigate(['/']);
    }
  }
}
