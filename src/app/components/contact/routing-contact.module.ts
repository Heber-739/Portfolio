import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ContactComponent } from './contact.component';

const routing: Routes = [{ path: '', component: ContactComponent }];

@NgModule({
  declarations: [ContactComponent],
  imports: [CommonModule, RouterModule.forChild(routing), SharedModule],
  exports: [RouterModule],
})
export class RoutingContactModule {}
