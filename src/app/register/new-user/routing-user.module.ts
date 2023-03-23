import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { NewUserComponent } from './new-user.component';

const routing: Routes = [
  {
    path: '',
    component: NewUserComponent,
  },
];

@NgModule({
  declarations: [NewUserComponent],
  imports: [CommonModule, RouterModule.forChild(routing)],
  exports: [RouterModule],
})
export class RoutingUserModule {}
