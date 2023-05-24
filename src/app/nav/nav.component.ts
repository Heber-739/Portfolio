import { Component, OnInit } from '@angular/core';
import { UserService } from '../backend/service/user.service';
import { DataUser } from '../interface/dataUser';
import { CRUDLocalService } from '../backend/service/CRUD-Local.service';
import { AuthService } from '../backend/service/auth.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  selColor: boolean = false;
  isLogged: boolean;
  user: DataUser;
  start: boolean;
  menu: boolean;
  constructor(
    private authS: AuthService,
    private userS: UserService,
    private local: CRUDLocalService
  ) {
    let k: boolean = this.local.get('animation') ?? true;
    [this.start, this.menu] = [k, k];
    this.user =
      this.local.getUserData<DataUser>('user') ?? this.userS.getUser();
    this.isLogged = !!this.local.getUserData('token');
    this.changeTheme(localStorage.getItem('theme') || 'blue');
  }

  ngOnInit(): void {
    if (this.start) {
      setTimeout(() => ([this.menu, this.start] = [false, false]), 7000);
    }
    this.authS.logged$().subscribe({
      next: (res) => {
        this.isLogged = res;
        this.user = this.local.getUserData('user') ?? this.userS.getUser();
      },
    });
  }

  open() {
    this.menu = !this.menu;
  }
  logout(): void {
    this.authS.logOut();
    this.selColor = false;
  }

  changeTheme(v: string) {
    if (v == 'open') {
      this.selColor = !this.selColor;
    } else {
      this.open();
      this.selColor = false;
      localStorage.setItem('theme', v);
      let c: string[] = this.colors(v);
      for (let i = 0; i < 5; i++) {
        document.documentElement.style.setProperty(
          `--color${i + 1}`,
          `${c[i]}`
        );
      }
    }
  }

  colors(v?: string): string[] {
    if (v == 'red') {
      return ['#a30a29', '#e21d38', '#fc5555', '#761622', '#db4900'];
    } else if (v == 'green') {
      return ['#40A33C', '#b38f00', '#6bb300', '#356600', '#7d6400'];
    } else if (v == 'dark') {
      return ['#4d4d4d', '#778899', '#595959', '#1a1a1a', '#0e0e0e'];
    }
    return ['#3c40a4', '#4d68f0', '#8697fe', '#003567', '#119e99'];
  }
}
