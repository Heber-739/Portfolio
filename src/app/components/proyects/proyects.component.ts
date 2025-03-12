import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LocalStorageService } from 'src/app/service/localStorage.service';
import { ModalService } from 'src/app/service/modal.service';
import { SpinnerService } from 'src/app/service/spinner-interceptor/spinner.service';
import { CryptoFormComponent } from './crypto-form/crypto-form.component';

@Component({
    selector: 'app-proyects',
    imports: [CryptoFormComponent],
    templateUrl: './proyects.component.html',
    styleUrls: ['./proyects.component.css']
})
export class ProyectsComponent implements OnInit {
  haveBalance: boolean = false;

  constructor(
    private localS: LocalStorageService,
    private router: Router,
    private popup: ModalService,
    private spinner: SpinnerService
  ) {}
  ngOnInit(): void {
    this.localS.$haveBalance.subscribe((res) => (this.haveBalance = res));
  }

  redirigir(valor: String) {
    if (this.haveBalance) {
      this.spinner.show();
      this.router.navigate(['proyectos', valor]).then(() => {
        this.spinner.hide();
      });
    } else {
      this.popup.showMessage(
        'Deposite un monto mínimo de $1000 para tener acceso'
      );
    }
  }
}
