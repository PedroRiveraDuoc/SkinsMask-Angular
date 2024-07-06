import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { provideClientHydration } from '@angular/platform-browser';
import { provideFirebaseApp, initializeApp } from '@angular/fire/app';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { provideStorage, getStorage } from '@angular/fire/storage';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCRY0ZbwsP8-nOvMC5Twhb_bhazDWtd0ik",
  authDomain: "skinsmask-9d73a.firebaseapp.com",
  projectId: "skinsmask-9d73a",
  storageBucket: "skinsmask-9d73a.appspot.com",
  messagingSenderId: "989526510912",
  appId: "1:989526510912:web:669994042e53ee6b303ea5"
};

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideClientHydration(),
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideStorage(() => getStorage())
  ]
};
