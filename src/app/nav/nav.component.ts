import { Component, OnInit } from '@angular/core';
import { TokenService } from '../backend/service/token.service';
import { UserService } from '../backend/service/user.service';
import { DataUser } from '../interface/dataUser';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css'],
})
export class NavComponent implements OnInit {
  selColor: boolean = false;
  isLogged: boolean = false;
  user!: DataUser;
  start!: boolean;
  menu: boolean = false;
  photo!: string;
  constructor(private tokenService: TokenService, private userS: UserService) {}
  ngOnInit(): void {
    /* this.start = this.tokenService.start(); */
    this.start = false;
    this.user = this.userS.getUser();
    this.photo = this.user.img.data_img;
    this.userS.subscribeUser().subscribe({ next: (res) => (this.user = res) });
    this.tokenService
      .loggedObservable()
      .subscribe({ next: (res) => (this.isLogged = res) });
    this.changeTheme(JSON.parse(localStorage.getItem('theme')!));
  }

  changeTheme(v: string) {
    if (v == 'open') {
      this.selColor = !this.selColor;
    } else {
      this.selColor = false;
      localStorage.setItem('theme', JSON.stringify(v));
      let c: string[] = this.colors(v);
      for (let i = 0; i < 5; i++) {
        document.documentElement.style.setProperty(
          `--color${i + 1}`,
          `${c[i]}`
        );
      }
    }
  }
  open() {
    this.menu = !this.menu;
  }
  logout(): void {
    this.tokenService.logOut();
    this.tokenService.changeObservable(false);
    window.location.reload();
    this.selColor = false;
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
