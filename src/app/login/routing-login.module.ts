import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { RouterModule, Routes } from '@angular/router';
import { NewRegistrationComponent } from './new-registration/new-registration.component';

const routing: Routes = [{ path: '', component: LoginComponent }];

@NgModule({
  declarations: [LoginComponent, NewRegistrationComponent],
  imports: [CommonModule, RouterModule.forChild(routing)],
  exports: [RouterModule],
})
export class RoutingLoginModule {}
