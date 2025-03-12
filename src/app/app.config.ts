import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { routes } from './app.routes';
import { interceptorProvider } from './service/spinner-interceptor/headers.interceptor';
import { provideRouter } from '@angular/router';
import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes),interceptorProvider,
    provideHttpClient(withInterceptorsFromDi())]
};
