import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { LoginUser } from 'src/app/backend/interface/loginUser';
import { AuthService } from 'src/app/backend/service/auth.service';
import { NewRegistrationComponent } from './new-registration/new-registration.component';

@Component({
    selector: 'app-login',
    imports: [ReactiveFormsModule, CommonModule, NewRegistrationComponent],
    templateUrl: './login.component.html',
    styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;

  login = new UntypedFormGroup({
    username: new UntypedFormControl('', [Validators.required]),
    password: new UntypedFormControl('', [Validators.required]),
  });

  constructor(private auth: AuthService, private authservice: AuthService) {}

  ngOnInit(): void {
    this.auth.logged$().subscribe({ next: (res) => (this.isLogged = res) });
  }

  enter(): void {
    const loginUser: LoginUser = {
      username: this.login.get('username')?.value,
      password: this.login.get('password')?.value,
    };
    this.authservice.loginUser(loginUser);
  }
}
