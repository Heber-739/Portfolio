import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/backend/service/user.service';
import { DataUser } from 'src/app/interface/dataUser';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
})
export class HeaderComponent implements OnInit {
  edithMode: boolean = false;
  user: DataUser = {} as DataUser;
  constructor(private userService: UserService) {}

  ngOnInit(): void {
    this.userService.subscribeUser().subscribe({
      next: (res) => {
        this.user = res;
      },
    });
  }
}
