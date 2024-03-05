import { Component, OnInit } from '@angular/core';
import { ModalService } from './service/modal.service';
import { SpinnerService } from './service/spinner-interceptor/spinner.service';
import { RouterOutlet } from '@angular/router';
import { SpinnerInterceptorComponent } from './service/spinner-interceptor/spinner-interceptor.component';
import { NavComponent } from './components/nav/nav.component';
import { FooterComponent } from './components/footer/footer.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet,SpinnerInterceptorComponent,NavComponent,FooterComponent,CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'portafolio';
  isLoading: boolean = false;
  haveMessage = false;
  content: string = '';
  constructor(
    private spinnerService: SpinnerService,
    private popupService: ModalService
  ) {
    this.popupService.$popup.subscribe((res) => {
      if (res) {
        this.haveMessage = res;
        this.content = this.popupService.getText();
      }
    });
  }
  ngOnInit() {
    this.spinnerService.subscribeLoading().subscribe({
      next: (res) => (this.isLoading = res),
    });
  }
  closePopup() {
    this.popupService.$popup.emit(false);
    this.haveMessage = false;
  }
  onActivate() {
    window.scroll(0, 0);
  }
}
