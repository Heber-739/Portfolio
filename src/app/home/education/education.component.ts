import { Component, OnInit } from '@angular/core';
import { EducationService } from 'src/app/backend/service/education.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { Education } from 'src/app/interface/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  eds: Education[] = [];
  edithEd: Education = {} as Education;

  constructor(private token: TokenService, private ed: EducationService) {}

  ngOnInit(): void {
    this.ed.subscribeEds().subscribe({
      next: (res) => (this.eds = res),
    });
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });
    if (this.ed.getLocalEducations().length > 0) {
      this.eds = this.ed.getLocalEducations();
    } else {
      this.ed.getEducation();
    }
  }

  addEducation() {
    this.toEdith = !this.toEdith;
  }
  del(e: Education) {
    this.ed.deleteEducation(e.id!);
  }
  edith(e: Education) {
    this.edithEd = e;
    this.toEdith = !this.toEdith;
  }
  finish(ev: boolean) {
    this.toEdith = ev;
  }
}
