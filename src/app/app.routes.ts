import { Routes } from '@angular/router';
import { CanLoadUserGuard } from './components/register/new-user/can-load-user.guard';
import { CanPlayGuard } from './components/proyects/can-play.guard';

export const routes: Routes = [
  {
    path: '', redirectTo:'home', pathMatch: "full"
  },
  {
    path: 'home',
    loadComponent: () =>
      import('./components/home/home.component').then((c) => c.HomeComponent),
  },
  {
    path: 'proyectos',
    loadComponent: () =>
      import('./components/proyects/proyects.component').then(
        (c) => c.ProyectsComponent
      ), children:[
        {
          path: 'encriptador',
          loadComponent: () =>
            import('./components/proyects/encryptor/encryptor.component').then((c) => c.EncryptorComponent),
          canActivate: [CanPlayGuard],
          data: { preload: true },
        },

        {
          path: 'ahorcado',
          loadComponent: () =>
            import('./components/proyects/hanged/hanged.component').then((c) => c.HangedComponent),
          canActivate: [CanPlayGuard],

          data: { preload: true },
        },
        {
          path: 'chohan',
          loadComponent: () =>
            import('./components/proyects/chohan/chohan.component').then((c) => c.ChohanComponent),
          canActivate: [CanPlayGuard],
          data: { preload: true },
        },
      ]
  },
  {
    path: 'contacto',
    loadComponent: () =>
      import('./components/contact/contact.component').then(
        (c) => c.ContactComponent
      ),
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./components/login/login.component').then((c) => c.LoginComponent),
  },
  {
    path: 'sign-up',
    loadComponent: () =>
      import('./components/login/new-registration/new-registration.component').then((c) => c.NewRegistrationComponent),
  },
  {
    path: 'user',
    loadComponent: () =>
      import('./components/register/new-user/new-user.component').then(
        (c) => c.NewUserComponent
      ),
    canLoad: [CanLoadUserGuard],
  },
  { path: '**', redirectTo: '' },
];

