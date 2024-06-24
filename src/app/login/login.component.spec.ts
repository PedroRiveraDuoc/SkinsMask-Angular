import { ComponentFixture, TestBed } from '@angular/core/testing';
import { LoginComponent } from './login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';
import { of } from 'rxjs';

/**
 * Pruebas unitarias para LoginComponent
 */
describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;
  let authService: AuthService;

  beforeEach(async () => {
    const authServiceMock = {
      login: jasmine.createSpy('login').and.returnValue(of(true))
    };

    await TestBed.configureTestingModule({
      imports: [ReactiveFormsModule, LoginComponent], // Importar en lugar de declarar
      providers: [
        { provide: AuthService, useValue: authServiceMock }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    authService = TestBed.inject(AuthService);
    fixture.detectChanges();
  });

  /**
   * Verifica que el componente se crea correctamente.
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario es inválido cuando está vacío.
   */
  it('should have an invalid form when empty', () => {
    expect(component.loginForm.valid).toBeFalsy();
  });

  /**
   * Valida el control de entrada del correo electrónico.
   */
  it('should validate email input', () => {
    let email = component.loginForm.controls['email'];
    expect(email.valid).toBeFalsy();

    email.setValue('');
    expect(email.hasError('required')).toBeTruthy();

    email.setValue('invalidEmail');
    expect(email.hasError('email')).toBeTruthy();

    email.setValue('valid@example.com');
    expect(email.valid).toBeTruthy();
  });

  /**
   * Valida el control de entrada de la contraseña.
   */
  it('should validate password input', () => {
    let password = component.loginForm.controls['password'];
    expect(password.valid).toBeFalsy();

    password.setValue('');
    expect(password.hasError('required')).toBeTruthy();

    password.setValue('validpassword');
    expect(password.valid).toBeTruthy();
  });

  /**
   * Verifica que el método login de AuthService se llama al enviar el formulario.
   */
  it('should call AuthService login method on form submit', () => {
    expect(authService.login).not.toHaveBeenCalled();
    component.loginForm.controls['email'].setValue('valid@example.com');
    component.loginForm.controls['password'].setValue('validpassword');
    component.onSubmit();
    expect(authService.login).toHaveBeenCalled();
  });

  /**
   * Verifica que la propiedad submitted se establece en true al enviar el formulario.
   */
  it('should set submitted to true on form submit', () => {
    spyOn(component, 'onSubmit').and.callThrough();
    component.loginForm.controls['email'].setValue('valid@example.com');
    component.loginForm.controls['password'].setValue('validpassword');
    component.onSubmit();
    expect(component.onSubmit).toHaveBeenCalled();
  });

  /**
   * Verifica que el método login de AuthService no se llama si el formulario es inválido.
   */
  it('should not call AuthService login method if form is invalid', () => {
    component.loginForm.controls['email'].setValue('');
    component.loginForm.controls['password'].setValue('');
    component.onSubmit();
    expect(authService.login).not.toHaveBeenCalled();
  });
});
