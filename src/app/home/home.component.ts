import { Component, OnInit } from '@angular/core';
import { TokenService } from '../backend/service/token.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  edithMode: boolean = false;
  isLogged!: boolean;

  constructor(private token: TokenService) {
    this.isLogged = !!this.token.getToken();
  }

  ngOnInit(): void {
    this.token.loggedObservable().subscribe({
      next: (res) => {
        this.isLogged = res;
        console.log('home');
      },
    });
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  edithModeEnter() {
    this.token.changeEdithObservable(true);
  }
  edithModeExit() {
    this.token.changeEdithObservable(false);
  }
}
