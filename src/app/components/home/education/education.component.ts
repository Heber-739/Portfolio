import { Component, OnInit } from '@angular/core';
import {
  CRUDLocalService,
  DATA,
} from 'src/app/backend/service/CRUD-Local.service';
import { AuthService } from 'src/app/backend/service/auth.service';
import { EducationService } from 'src/app/backend/service/education.service';
import { Education } from 'src/app/interface/education';
import * as edsUser from '../../../../assets/json/eds.json';
import { CommonModule } from '@angular/common';
import { FormEducationComponent } from './form-education/form-education.component';
import { TagsComponent } from './tags/tags.component';

const { educations } = DATA;

@Component({
  selector: 'app-education',
  standalone: true,
  imports: [CommonModule,FormEducationComponent,TagsComponent],
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  eds: Education[] = [];
  edithEd: Education = {} as Education;

  constructor(
    private local: CRUDLocalService,
    private authS: AuthService,
    private ed: EducationService
  ) {
    this.eds = this.local.get(educations) ?? edsUser;
    /* this.eds = this.local.get(educations) ?? this.ed.getEducation(); */
  }

  ngOnInit(): void {
    this.ed.subscribeEds().subscribe({
      next: (res) => (this.eds = res),
    });
    this.authS.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  del(e: Education) {
    this.ed.deleteEducation(e);
  }
  edith(e?: Education) {
    if (e) {
      this.edithEd = e;
    }
    this.toEdith = !this.toEdith;
  }
}
