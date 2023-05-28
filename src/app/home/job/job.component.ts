import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/backend/service/auth.service';
import { JobService } from 'src/app/backend/service/job.service';
import { Job } from 'src/app/interface/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
})
export class JobComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  jobs: Job[];
  edithJob: Job = {} as Job;
  constructor(private auth: AuthService, private jobService: JobService) {
    this.jobs = this.jobService.getJobs();
  }

  ngOnInit(): void {
    this.jobService.subscribeJob().subscribe({
      next: (res) => (this.jobs = res),
    });
    this.auth.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  delete(e: Job) {
    this.jobService.deleteJob(e);
  }
  edith(e?: Job) {
    if (e) {
      this.edithJob = e;
    }
    this.toEdith = !this.toEdith;
  }
}
