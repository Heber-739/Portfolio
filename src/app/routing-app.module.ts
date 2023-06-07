import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PreloadService } from './service/preload.service';
import { SharedModule } from './shared.module';
import { CanLoadUserGuard } from './components/register/new-user/can-load-user.guard';

const routing: Routes = [
  {
    path: '',
    loadChildren: () =>
      import('./components/home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'proyectos',
    loadChildren: () =>
      import('./components/proyects/proyects.module').then(
        (m) => m.ProyectsModule
      ),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./components/contact/contact.module').then(
        (m) => m.ContactModule
      ),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./components/login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'user',
    loadChildren: () =>
      import('./components/register/new-user/user.module').then(
        (m) => m.UserModule
      ),
    canLoad: [CanLoadUserGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forRoot(routing, {
      preloadingStrategy: PreloadService,
    }),
    HttpClientModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [CanLoadUserGuard],
})
export class RoutingAppModule {}
