import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private currentUserSubject = new BehaviorSubject<any>(null);
    currentUser$ = this.currentUserSubject.asObservable();

    constructor() {
        if (typeof localStorage !== 'undefined') {
            const storedUser = JSON.parse(localStorage.getItem('currentUser') || 'null');
            this.currentUserSubject.next(storedUser);
        }
    }

    login(email: string, password: string): boolean {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        const user = users.find((u: any) => u.email === email && u.password === password);
        if (user) {
            this.currentUserSubject.next(user);
            if (typeof localStorage !== 'undefined') {
                localStorage.setItem('currentUser', JSON.stringify(user));
            }
            console.log('User logged in:', user);
            return true;
        }
        return false;
    }

    logout(): void {
        this.currentUserSubject.next(null);
        if (typeof localStorage !== 'undefined') {
            localStorage.removeItem('currentUser');
        }
        console.log('User logged out');
    }

    register(newUser: any): void {
        const users = JSON.parse(localStorage.getItem('users') || '[]');
        users.push(newUser);
        localStorage.setItem('users', JSON.stringify(users));
        console.log('User registered:', newUser);
    }

    getCurrentUser(): any {
        return this.currentUserSubject.value;
    }
}
