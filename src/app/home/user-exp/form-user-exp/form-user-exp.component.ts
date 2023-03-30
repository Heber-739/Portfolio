import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { WorkExperienceService } from 'src/app/backend/service/work-experience.service';
import { WorkExp } from 'src/app/interface/workExp';

@Component({
  selector: 'app-form-user-exp',
  templateUrl: './form-user-exp.component.html',
  styleUrls: ['./form-user-exp.component.css'],
})
export class FormUserExpComponent implements OnInit {
  @Input() edithWorks: WorkExp = {} as WorkExp;
  workId: number = 0;
  formWork = new FormGroup({
    name: new FormControl('', [Validators.required]),
    description: new FormControl('', [Validators.required]),
  });
  constructor(private workService: WorkExperienceService) {}

  ngOnInit(): void {
    if (this.edithWorks.id) {
      this.formWork.patchValue({
        name: this.edithWorks.name,
        description: this.edithWorks.description,
      });
      this.workId = this.edithWorks.id!;
    }
  }

  saveWork() {
    let work: WorkExp = {
      name: this.formWork.get('name')?.value,
      description: this.formWork.get('description')?.value,
    };
    if (this.edithWorks.id == 0) {
      this.workService.createWorkExp(work);
    } else if (this.edithWorks.id == 0) {
      work.id = this.edithWorks.id;
      this.workService.updateWorkExp(work);
    }
    this.formWork.reset();
    this.edithWorks = {} as WorkExp;
  }
}
