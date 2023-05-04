import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user.component';
import { SharedModule } from '../../shared.module';

const rout: Routes = [{ path: 'e', component: NewUserComponent }];

@NgModule({
  declarations: [NewUserComponent],
  imports: [CommonModule, RouterModule.forChild(rout), SharedModule],
  exports: [RouterModule],
})
export class RoutingUserModule {}
