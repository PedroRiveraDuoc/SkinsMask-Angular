import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { StorageService } from './storage.service';
/**
 * Servicio de autenticación.
 * 
 * Este servicio maneja la lógica de autenticación, incluyendo inicio de sesión, cierre de sesión,
 * registro de usuarios y recuperación de contraseñas.
 */
@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    /**
     * Constructor del AuthService.
     * 
     * @param storageService StorageService - Servicio de almacenamiento para manejar datos en localStorage.
     */
    constructor(private storageService: StorageService) {
        const user = JSON.parse(this.storageService.getItem('currentUser') || 'null');
        this.currentUserSubject.next(user);
    }
    /**
     * Inicia sesión con el correo electrónico y la contraseña proporcionados.
     * 
     * @param email string - Correo electrónico del usuario.
     * @param password string - Contraseña del usuario.
     * @returns boolean - true si el inicio de sesión fue exitoso, false de lo contrario.
     */
    login(email: string, password: string): boolean {
        const users = JSON.parse(this.storageService.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
            this.currentUserSubject.next(user);
            this.storageService.setItem('currentUser', JSON.stringify(user));
            return true;
        }
        return false;
    }
    /**
     * Cierra sesión del usuario actual.
     */
    logout(): void {
        this.currentUserSubject.next(null);
        this.storageService.removeItem('currentUser');
    }
    /**
     * Registra un nuevo usuario.
     * 
     * @param newUser any - Datos del nuevo usuario.
     */
    register(newUser: any): void {
        const users = JSON.parse(this.storageService.getItem('users') || '[]');
        newUser.id = users.length + 1; // Asigna un ID único al usuario
        users.push(newUser);
        this.storageService.setItem('users', JSON.stringify(users));
    }
    /**
     * Obtiene el usuario actual.
     * 
     * @returns any - Datos del usuario actual.
     */
    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }
    /**
     * Actualiza los datos del usuario.
     * 
     * @param updatedUser any - Datos actualizados del usuario.
     */
    updateUser(updatedUser: any): void {
        const users = JSON.parse(this.storageService.getItem('users') || '[]');
        const userIndex = users.findIndex((u: any) => u.id === updatedUser.id);
        if (userIndex !== -1) {
            users[userIndex] = updatedUser;
            this.storageService.setItem('users', JSON.stringify(users));
            this.storageService.setItem('currentUser', JSON.stringify(updatedUser));
            this.currentUserSubject.next(updatedUser);
        }
    }
    /**
     * Envía un enlace de recuperación de contraseña al correo electrónico proporcionado.
     * 
     * @param email string - Correo electrónico del usuario.
     * @returns Observable<any> - Observable que indica el resultado de la operación.
     */
    resetPassword(email: string): Observable<boolean> {
        const users = JSON.parse(this.storageService.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email);
        if (user) {
            return of(true); // Simula el envío exitoso del correo electrónico
        } else {
            return of(false); // Simula un error en el envío del correo electrónico
        }
    }
}
