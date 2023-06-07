import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { SharedModule } from 'src/app/shared.module';
import { CanPlayGuard } from './can-play.guard';
import { CryptoFormComponent } from './crypto-form/crypto-form.component';
import { ProyectsComponent } from './proyects.component';

const routing: Routes = [
  { path: '', component: ProyectsComponent },
  {
    path: 'encriptador',
    loadChildren: () =>
      import('./encryptor/encryptor.module').then((m) => m.EncryptorModule),
    canActivate: [CanPlayGuard],
    data: { preload: true },
  },

  {
    path: 'ahorcado',
    loadChildren: () =>
      import('./hanged/hanged.module').then((m) => m.HangedModule),
    canActivate: [CanPlayGuard],

    data: { preload: true },
  },
  {
    path: 'chohan',
    loadChildren: () =>
      import('./chohan/chohan.module').then((m) => m.ChohanModule),
    canActivate: [CanPlayGuard],
    data: { preload: true },
  },
];

@NgModule({
  declarations: [ProyectsComponent, CryptoFormComponent],
  imports: [CommonModule, RouterModule.forChild(routing), SharedModule],
  exports: [RouterModule],
})
export class RoutingProyectsModule {}
