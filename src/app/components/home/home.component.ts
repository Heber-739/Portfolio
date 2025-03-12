import { Component, OnInit } from '@angular/core';
import {
  DATA,
  CRUDLocalService,
} from 'src/app/backend/service/CRUD-Local.service';
import { AuthService } from 'src/app/backend/service/auth.service';
import { SoftSkillsComponent } from './soft-skills/soft-skills.component';
import { HeaderComponent } from './header/header.component';
import { EducationComponent } from './education/education.component';
import { JobComponent } from './job/job.component';

const { token } = DATA;
@Component({
    selector: 'app-home',
    imports: [HeaderComponent, SoftSkillsComponent, EducationComponent, JobComponent],
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.css']
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
