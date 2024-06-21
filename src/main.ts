import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './app/app.config';
import { AppComponent } from './app/app.component';

if (typeof window !== 'undefined' && window.localStorage) {
  bootstrapApplication(AppComponent, appConfig)
    .catch((err) => console.error(err));
} else {
  console.error('localStorage is not available in this environment.');
}
