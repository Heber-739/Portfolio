import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { JobService } from 'src/app/backend/service/job.service';
import { Job } from 'src/app/Interface/job';

@Component({
  selector: 'app-form-job',
  templateUrl: './form-job.component.html',
  styleUrls: ['./form-job.component.css'],
})
export class FormJobComponent implements OnInit {
  @Input() edithJob: Job = {} as Job;
  jobId: number = 0;
  formJob = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private jobService: JobService) {}

  ngOnInit(): void {
    if (this.edithJob.id) {
      this.formJob.patchValue({
        name: this.edithJob.name,
        description: this.edithJob.description,
      });
      this.jobId = this.edithJob.id!;
    }
  }

  saveJob() {
    let job: Job = {
      name: this.formJob.get('name')?.value,
      description: this.formJob.get('description')?.value,
    };
    if (this.edithJob.id == 0) {
      this.jobService.createJob(job);
    } else if (this.edithJob.id == 0) {
      job.id = this.edithJob.id;
      this.jobService.updateWorkExp(job);
    }
    this.formJob.reset();
    this.edithJob = {} as Job;
  }
}
