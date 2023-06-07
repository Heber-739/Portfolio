import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { NewUserComponent } from './new-user.component';

const rout: Routes = [{ path: '', component: NewUserComponent }];

@NgModule({
  declarations: [NewUserComponent],
  imports: [CommonModule, RouterModule.forChild(rout), SharedModule],
  exports: [RouterModule],
})
export class RoutingUserModule {}
