import { Component, OnInit } from '@angular/core';
import {
  CRUDLocalService,
  DATA,
} from 'src/app/backend/service/CRUD-Local.service';
import { AuthService } from 'src/app/backend/service/auth.service';
import { DataUser } from 'src/app/interface/dataUser';
import * as userJson from '../../../../assets/json/user.json';
import { SkillsComponent } from '../skills/skills.component';
import { CommonModule } from '@angular/common';

const { user } = DATA;

@Component({
    selector: 'app-header',
    imports: [CommonModule, SkillsComponent],
    templateUrl: './header.component.html',
    styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  edithMode: boolean = false;
  usser: DataUser;
  constructor(private authS: AuthService, private local: CRUDLocalService) {
    this.usser = this.local.getUserData(user) ?? userJson;
  }
  ngOnInit(): void {
    this.authS.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
    this.authS.logged$().subscribe({
      next: () => (this.usser = this.local.getUserData(user) ?? userJson),
    });
  }
}
