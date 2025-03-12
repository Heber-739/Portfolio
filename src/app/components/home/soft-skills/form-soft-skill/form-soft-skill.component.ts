import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { SoftSkillService } from 'src/app/backend/service/soft-skill.service';
import { SoftSkill } from 'src/app/interface/softSkill';

@Component({
    selector: 'app-form-soft-skill',
    imports: [ReactiveFormsModule, CommonModule],
    templateUrl: './form-soft-skill.component.html',
    styleUrls: ['./form-soft-skill.component.css']
})
export class FormSoftSkillComponent implements OnInit {
  @Input() edithSS!: SoftSkill;
  ssId: number = 0;
  formSS = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    description: new UntypedFormControl('', [Validators.required]),
  });
  constructor(private ssService: SoftSkillService) {}

  ngOnInit(): void {
    if (this.edithSS.id) {
      this.formSS.patchValue({
        name: this.edithSS.name,
        description: this.edithSS.description,
      });
      this.ssId = this.edithSS.id;
    }
  }

  saveSS() {
    let ss: SoftSkill = {
      name: this.formSS.get('name')?.value,
      description: this.formSS.get('description')?.value,
    };
    if (this.edithSS.id == 0) {
      this.ssService.createSoftSkill(ss);
    } else {
      ss.id = this.edithSS.id;
      this.ssService.updateSoftSkill(ss);
    }
    this.formSS.reset();
    this.edithSS = {} as SoftSkill;
  }
}
