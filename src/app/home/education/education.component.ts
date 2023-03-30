import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { EducationService } from 'src/app/backend/service/education.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { Education } from 'src/app/interface/education';

@Component({
  selector: 'app-education',
  templateUrl: './education.component.html',
  styleUrls: ['./education.component.css'],
})
export class EducationComponent implements OnInit, AfterContentInit, OnDestroy {
  edithMode: boolean = false;
  toEdith: boolean = false;
  eds: Education[] = [];
  edithEd: Education = {} as Education;
  unsuscribe: Subject<boolean> = new Subject();

  constructor(private token: TokenService, private ed: EducationService) {}

  ngOnInit(): void {
    this.ed
      .subscribeEds()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.eds = res),
      });
    this.token
      .edithObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.edithMode = res),
      });
  }
  ngAfterContentInit(): void {
    this.ed.getEducation();
  }
  ngOnDestroy(): void {
    this.unsuscribe.next(true);
  }

  addEducation() {
    this.toEdith = !this.toEdith;
  }
  del(e: Education) {
    this.ed.deleteEducation(e);
  }
  edith(e: Education) {
    this.edithEd = e;
    this.toEdith = !this.toEdith;
  }
  finish(ev: boolean) {
    this.toEdith = ev;
  }
}
