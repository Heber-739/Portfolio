import { CommonModule } from '@angular/common';
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators, ReactiveFormsModule } from '@angular/forms';
import { EducationService } from 'src/app/backend/service/education.service';
import { Education } from 'src/app/interface/education';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
  selector: 'app-form-education',
  standalone: true,
  imports: [ReactiveFormsModule,CommonModule],
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.css'],
})
export class FormEducationComponent implements OnInit {
  @Input() edithEd!: Education;
  edFinish: boolean = false;
  image!: string;
  formEd = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    link: new UntypedFormControl('', [Validators.required]),
  });

  constructor(
    private imageCompress: ImageCompressService,
    private edService: EducationService
  ) {}

  ngOnInit(): void {
    if (this.edithEd.id) {
      this.formEd.patchValue({
        name: this.edithEd.name,
        link: this.edithEd.link,
      });
      this.image = this.edithEd.image;
      this.edFinish = this.edithEd.finish;
    }
  }

  onchange() {
    this.imageCompress.compress().then((resolve) => (this.image = resolve));
  }
  saveEducation() {
    let ed: Education = {
      name: this.formEd.get('name')?.value,
      link: this.formEd.get('link')?.value,
      finish: this.edFinish,
      image: this.image,
    };
    this.formEd.reset();
    if (this.edithEd.id) {
      this.edService.updateEducation(ed);
    } else if (!this.edithEd.id) {
      this.edithEd = this.edService.createEducation(ed);
    }
  }
  finished() {}
}
