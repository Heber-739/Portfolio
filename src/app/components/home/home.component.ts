import { Component, OnInit } from '@angular/core';
import {
  DATA,
  CRUDLocalService,
} from 'src/app/backend/service/CRUD-Local.service';
import { AuthService } from 'src/app/backend/service/auth.service';

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

  edithChange() {
    this.authS.changeEdith(!this.edithMode);
  }
}
