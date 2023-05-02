import { Component, OnDestroy, OnInit } from '@angular/core';
import { TokenService } from '../backend/service/token.service';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit, OnDestroy {
  edithMode: boolean = false;
  isLogged!: boolean;
  unsuscribe: Subject<boolean> = new Subject();

  constructor(private token: TokenService) {
    this.isLogged = !!this.token.getToken();
  }

  ngOnInit(): void {
    this.token
      .loggedObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.isLogged = res),
      });
    this.token
      .edithObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.edithMode = res),
      });
  }
  ngOnDestroy(): void {
    this.unsuscribe.next(true);
  }

  edithModeEnter() {
    this.token.changeEdithObservable(true);
  }
  edithModeExit() {
    this.token.changeEdithObservable(false);
  }
}
