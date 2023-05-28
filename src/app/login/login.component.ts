import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { LoginUser } from '../backend/interface/loginUser';
import { AuthService } from '../backend/service/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  isLogged: boolean = false;

  login = new FormGroup({
    username: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required]),
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
