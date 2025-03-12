import { Component, OnInit } from '@angular/core';
import * as jobsJson from '@assets/json/jobs.json';
import { CommonModule } from '@angular/common';
import { FormJobComponent } from './form-job/form-job.component';
import { AuthService } from '@backend/service/auth.service';
import { DATA, CRUDLocalService } from '@backend/service/CRUD-Local.service';
import { JobService } from '@backend/service/job.service';
import { Job } from '@interface/job';

const { jobs } = DATA;

@Component({
    selector: 'app-job',
    imports: [CommonModule, FormJobComponent],
    templateUrl: './job.component.html',
    styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  jobsUser: Job[];
  edithJob: Job = {} as Job;
  constructor(
    private local: CRUDLocalService,
    private auth: AuthService,
    private jobService: JobService
  ) {
    this.jobsUser = this.local.get<Job[]>(jobs) ?? jobsJson;
  }

  ngOnInit(): void {
    this.jobService.subscribeJob().subscribe({
      next: (res) => (this.jobsUser = res),
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
