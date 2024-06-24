import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RegisterComponent, ReactiveFormsModule], // Importa RegisterComponent en lugar de declararlo
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  /**
   * Verifica la creación del componente.
   */
  it('should create the component', () => {
    expect(component).toBeTruthy();
  });

  /**
   * Verifica que el formulario contenga 5 controles.
   */
  it('should have a form with 5 controls', () => {
    expect(component.registerForm.contains('firstName')).toBeTruthy();
    expect(component.registerForm.contains('lastName')).toBeTruthy();
    expect(component.registerForm.contains('email')).toBeTruthy();
    expect(component.registerForm.contains('password')).toBeTruthy();
    expect(component.registerForm.contains('confirmPassword')).toBeTruthy();
  });

  /**
   * Verifica que el control de nombre sea obligatorio.
   */
  it('should make the firstName control required', () => {
    let control = component.registerForm.get('firstName');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();
  });

  /**
   * Verifica que el control de correo electrónico sea obligatorio y valide el formato.
   */
  it('should make the email control required and validate format', () => {
    let control = component.registerForm.get('email');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('invalidEmail');
    expect(control?.valid).toBeFalsy();

    control?.setValue('valid@example.com');
    expect(control?.valid).toBeTruthy();
  });

  /**
   * Verifica el requisito de longitud de la contraseña.
   */
  it('should check password length requirement', () => {
    let control = component.registerForm.get('password');
    control?.setValue('');
    expect(control?.valid).toBeFalsy();

    control?.setValue('short');
    expect(control?.valid).toBeFalsy();

    control?.setValue('longenoughpassword');
    expect(control?.valid).toBeTruthy();
  });

  /**
   * Verifica que las contraseñas coincidan.
   */
  it('should check if passwords match', () => {
    let passwordControl = component.registerForm.get('password');
    let confirmPasswordControl = component.registerForm.get('confirmPassword');

    passwordControl?.setValue('password');
    confirmPasswordControl?.setValue('differentPassword');
    expect(component.registerForm.errors).toEqual({ mismatch: true });

    confirmPasswordControl?.setValue('password');
    expect(component.registerForm.errors).toBeNull();
  });
});
