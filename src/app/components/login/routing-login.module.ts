import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { NewRegistrationComponent } from './new-registration/new-registration.component';
import { SharedModule } from 'src/app/shared.module';

const routing: Routes = [
  { path: '', component: LoginComponent },
  { path: 'new', component: NewRegistrationComponent },
];

@NgModule({
  declarations: [LoginComponent, NewRegistrationComponent],
  imports: [CommonModule, RouterModule.forChild(routing), SharedModule],
  exports: [RouterModule],
})
export class RoutingLoginModule {}
