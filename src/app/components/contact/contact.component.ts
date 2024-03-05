import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { MailService } from 'src/app/backend/service/mail.service';
import { Mail } from 'src/app/interface/mail';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
})
export class ContactComponent implements OnInit {
  emailForm = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    email: new UntypedFormControl('', [Validators.required, Validators.email]),
    message: new UntypedFormControl('', [
      Validators.required,
      Validators.minLength(20),
    ]),
  });

  constructor(private mailService: MailService) {}

  ngOnInit(): void {}
  send() {
    let mail: Mail = {
      name: this.emailForm.get('name')?.value,
      mail: this.emailForm.get('email')?.value,
      message: this.emailForm.get('message')?.value,
    };
    this.mailService.sendMail(mail);
    this.emailForm.reset();
  }
}
