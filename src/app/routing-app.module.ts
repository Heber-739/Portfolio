import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PreloadService } from './service/preload.service';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { NewUserComponent } from './register/new-user/new-user.component';
import { CanLoadUserGuard } from './register/new-registration/can-load-user.guard';
import { NewRegistrationComponent } from './register/new-registration/new-registration.component';

const routing: Routes = [
  { path: '', component: HomeComponent },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then((m) => m.HomeModule),
  },
  {
    path: 'proyectos',
    loadChildren: () =>
      import('./proyects/proyects.module').then((m) => m.ProyectsModule),
  },
  {
    path: 'contacto',
    loadChildren: () =>
      import('./contact/contact.module').then((m) => m.ContactModule),
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./login/login.module').then((m) => m.LoginModule),
  },
  {
    path: 'newRegistration',
    component: NewRegistrationComponent,
  },
  {
    path: 'newUser',
    component: NewUserComponent,
    canActivate: [CanLoadUserGuard],
  },
  { path: '**', component: HomeComponent },
];

@NgModule({
  declarations: [NewUserComponent, NewRegistrationComponent],
  imports: [
    RouterModule.forRoot(routing, {
      preloadingStrategy: PreloadService,
    }),
    NgCircleProgressModule.forRoot({}),
    HttpClientModule,
  ],
  exports: [RouterModule],
  providers: [],
})
export class RoutingAppModule {}
