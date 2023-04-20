import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { PreloadService } from './service/preload.service';
import { CanLoadUserGuard } from './register/new-user/can-load-user.guard';
import { SharedModule } from './shared.module';

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
    path: 'user',
    loadChildren: () =>
      import('./register/new-user/user.module').then((m) => m.UserModule),
    canActivate: [CanLoadUserGuard],
  },
  { path: '**', component: HomeComponent },
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
  providers: [],
})
export class RoutingAppModule {}
