import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '@environments/environment';
import { Mail } from '@interface/mail';
import { Message } from '@interface/Message';
import { ModalService } from '@service/modal.service';

@Injectable({
  providedIn: 'root',
})
export class MailService {
  mailURL: string = `${environment.URL}/sendMail`;

  constructor(private popup: ModalService, private http: HttpClient) {}

  public sendMail(mail: Mail) {
    this.http.post<Message>(this.mailURL, mail).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
      },
      error: (err) => this.popup.showMessage(err.error.message),
    });
  }
}
