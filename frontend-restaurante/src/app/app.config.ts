    import { ApplicationConfig } from '@angular/core';
    import { provideRouter } from '@angular/router';
    import { provideHttpClient } from '@angular/common/http';
    import { provideAnimations } from '@angular/platform-browser/animations'; // 1. IMPORTE AQUI

    import { routes } from './app.routes';

    export const appConfig: ApplicationConfig = {
      providers: [
        provideRouter(routes),
        provideHttpClient(),
        provideAnimations() // 2. ADICIONE AQUI
      ]
    };
    