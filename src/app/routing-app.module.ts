import { NgModule } from '@angular/core';
import { HomeComponent } from './home/home.component';
import { ContactComponent } from './contact/contact.component';
import { CryptoFormComponent } from './proyects/crypto-form/crypto-form.component';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { ModalService } from './service/modal.service';
import { PreloadService } from './service/preload.service';
import { SharedModule } from './shared.module';
import { LoginComponent } from './login/login.component';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { LocalStorageService } from './service/localStorage.service';
import { NewRegistrationComponent } from './register/new-registration/new-registration.component';
import { NewUserComponent } from './register/new-user/new-user.component';
import { CanLoadUserGuard } from './register/new-registration/can-load-user.guard';
import { TokenService } from './backend/service/token.service';
import { UserService } from './backend/service/user.service';
import { EducationService } from './backend/service/education.service';
import { AuthService } from './backend/service/auth.service';
import { HardSkillService } from './backend/service/hard-skill.service';
import { SoftSkillService } from './backend/service/soft-skill.service';
import { TagService } from './backend/service/tag.service';
import { WorkExperienceService } from './backend/service/work-experience.service';
import { SpinnerService } from './service/spinner-interceptor/spinner.service';

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
  { path: 'contacto', component: ContactComponent },
  { path: 'login', component: LoginComponent },
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
  declarations: [
    ContactComponent,
    LoginComponent,
    NewRegistrationComponent,
    NewUserComponent,
  ],
  imports: [
    RouterModule.forRoot(routing, {
      preloadingStrategy: PreloadService,
    }),
    NgCircleProgressModule.forRoot({}),
    HttpClientModule,
    SharedModule,
  ],
  exports: [RouterModule],
  providers: [
    ModalService,
    LocalStorageService,
    TokenService,
    UserService,
    EducationService,
    AuthService,
    HardSkillService,
    SoftSkillService,
    TagService,
    WorkExperienceService,
    SpinnerService,
  ],
})
export class RoutingAppModule {}
