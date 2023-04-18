import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ContactComponent } from './contact.component';
import { SharedModule } from '../shared.module';

const routing: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, RouterModule.forChild(routing), SharedModule],
  exports: [RouterModule],
})
export class RoutingContactModule {}
