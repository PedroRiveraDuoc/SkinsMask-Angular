import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private storageKey = 'users';
    private inMemoryStorage: { [key: string]: any } = {};
    private currentUserSubject = new BehaviorSubject<any>(this.getCurrentUser());

    currentUser$ = this.currentUserSubject.asObservable();

    constructor() { }

    register(user: any): void {
        const users = this.getUsers();
        users.push(user);
        this.setItem(this.storageKey, JSON.stringify(users));
        console.log('User registered:', user);
    }

    login(email: string, password: string): boolean {
        const users = this.getUsers();
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
            this.setItem('currentUser', JSON.stringify(user));
            this.currentUserSubject.next(user); // Emitir el nuevo estado
            console.log('User logged in:', user);
            return true;
        } else {
            console.log('Login failed for email:', email);
            return false;
        }
    }

    logout(): void {
        this.removeItem('currentUser');
        this.currentUserSubject.next(null); // Emitir el nuevo estado
        console.log('User logged out.');
    }

    getCurrentUser(): any {
        return JSON.parse(this.getItem('currentUser') || 'null');
    }

    isAuthenticated(): boolean {
        return this.getCurrentUser() !== null;
    }

    private getUsers(): any[] {
        return JSON.parse(this.getItem(this.storageKey) || '[]');
    }

    private setItem(key: string, value: string): void {
        if (this.isLocalStorageAvailable()) {
            localStorage.setItem(key, value);
        } else {
            this.inMemoryStorage[key] = value;
        }
    }

    private getItem(key: string): string | null {
        if (this.isLocalStorageAvailable()) {
            return localStorage.getItem(key);
        } else {
            return this.inMemoryStorage[key] || null;
        }
    }

    private removeItem(key: string): void {
        if (this.isLocalStorageAvailable()) {
            localStorage.removeItem(key);
        } else {
            delete this.inMemoryStorage[key];
        }
    }

    private isLocalStorageAvailable(): boolean {
        try {
            const testKey = 'test';
            localStorage.setItem(testKey, '1');
            localStorage.removeItem(testKey);
            return true;
        } catch (e) {
            return false;
        }
    }
}
