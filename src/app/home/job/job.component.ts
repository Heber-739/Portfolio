import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { TokenService } from 'src/app/backend/service/token.service';
import { JobService } from 'src/app/backend/service/job.service';
import { Job } from 'src/app/interface/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit, AfterContentInit, OnDestroy {
  edithMode: boolean = false;
  toEdith: boolean = false;
  jobs: Job[] = [];
  edithJob: Job = {} as Job;
  unsuscribe: Subject<boolean> = new Subject();
  constructor(private token: TokenService, private jobService: JobService) {}

  ngOnInit(): void {
    this.jobService
      .subscribeJob()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.jobs = res),
      });
    this.token
      .edithObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.edithMode = res),
      });
  }
  ngAfterContentInit(): void {
    this.jobService.getJobs();
  }
  ngOnDestroy(): void {
    this.unsuscribe.next(true);
  }

  addJob() {
    this.toEdith = !this.toEdith;
  }
  delete(e: Job) {
    this.jobService.deleteJob(e);
  }
  edith(e: Job) {
    this.edithJob = e;
    this.addJob();
  }
}
