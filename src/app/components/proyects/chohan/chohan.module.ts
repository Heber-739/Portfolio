import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { ChohanComponent } from './chohan.component';

const routChohan: Routes = [{ path: '', component: ChohanComponent }];

@NgModule({
  declarations: [ChohanComponent],
  imports: [RouterModule.forChild(routChohan), SharedModule],
  exports: [RouterModule],
})
export class ChohanModule {}
