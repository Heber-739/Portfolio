import { Component, OnInit } from '@angular/core';
import { ModalService } from './service/modal.service';
import { SpinnerService } from './service/spinner-interceptor/spinner.service';

@Component({
  selector: 'app-root',
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
