import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { StorageService } from './storage.service';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor(private storageService: StorageService) {
        if (this.storageService.isLocalStorageAvailable()) {
            const user = JSON.parse(this.storageService.getItem('currentUser') || 'null');
            this.currentUserSubject.next(user);
        }
    }

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

    logout(): void {
        this.currentUserSubject.next(null);
        this.storageService.removeItem('currentUser');
    }

    register(newUser: any): void {
        const users = JSON.parse(this.storageService.getItem('users') || '[]');
        newUser.id = users.length + 1; // Asigna un ID único al usuario
        users.push(newUser);
        this.storageService.setItem('users', JSON.stringify(users));
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }
}
