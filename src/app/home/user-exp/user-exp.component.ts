import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TokenService } from 'src/app/backend/service/token.service';
import { WorkExperienceService } from 'src/app/backend/service/work-experience.service';
import { WorkExp } from 'src/app/interface/workExp';

@Component({
  selector: 'app-user-exp',
  templateUrl: './user-exp.component.html',
  styleUrls: ['./user-exp.component.css'],
})
export class UserExpComponent implements OnInit, AfterContentInit, OnDestroy {
  edithMode: boolean = false;
  toEdith: boolean = false;
  works: WorkExp[] = [];
  edithWorks: WorkExp = {} as WorkExp;
  unsuscribe: Subject<boolean> = new Subject();
  constructor(
    private token: TokenService,
    private workService: WorkExperienceService
  ) {}

  ngOnInit(): void {
    this.workService
      .subscribeWExp()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.works = res),
      });
    this.token
      .edithObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.edithMode = res),
      });
  }
  ngAfterContentInit(): void {
    this.workService.getWorkExp();
  }
  ngOnDestroy(): void {
    this.unsuscribe.next(true);
  }

  addWorkExp() {
    this.toEdith = !this.toEdith;
  }
  delete(e: WorkExp) {
    this.workService.deleteWorkExp(e);
  }
  edith(e: WorkExp) {
    this.edithWorks = e;
    this.addWorkExp();
  }
}
