import { Component, OnInit } from '@angular/core';
import { CRUDLocalService } from 'src/app/backend/service/CRUD-Local.service';
import { AuthService } from 'src/app/backend/service/auth.service';
import { DataUser } from 'src/app/interface/dataUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  edithMode: boolean = false;
  user: DataUser = {} as DataUser;
  constructor(private authS: AuthService, private local: CRUDLocalService) {
    this.getUser();
  }
  ngOnInit(): void {
    this.authS.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
    this.authS.logged$().subscribe({ next: () => this.getUser() });
  }

  getUser() {
    const getuser = setInterval(() => {
      this.user = this.local.getUserData('user');
      if (this.user != null) {
        clearInterval(getuser);
      }
    }, 1000);
  }
}
