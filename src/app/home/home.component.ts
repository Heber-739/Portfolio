import { Component, OnInit } from '@angular/core';
import { CRUDLocalService, DATA } from '../backend/service/CRUD-Local.service';
import { AuthService } from '../backend/service/auth.service';

const { token } = DATA;
@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit {
  edithMode: boolean = false;
  isLogged: boolean;

  constructor(private local: CRUDLocalService, private authS: AuthService) {
    this.isLogged = !!this.local.get(token);
  }

  ngOnInit(): void {
    this.authS.logged$().subscribe({
      next: (res) => (this.isLogged = res),
    });
    this.authS.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  edithChange(value: boolean) {
    this.authS.changeEdith(value);
  }
}
