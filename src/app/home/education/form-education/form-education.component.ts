import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { EducationService } from 'src/app/backend/service/education.service';
import { Education } from 'src/app/interface/education';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.css'],
})
export class FormEducationComponent implements OnInit {
  @Input() edithEd!: Education;
  edId: number = 0;
  edFinish: boolean = false;
  image!: string;
  formEd = new FormGroup({
    name: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
  });

  constructor(
    private imageCompress: ImageCompressService,
    private edService: EducationService
  ) {}

  ngOnInit(): void {
    if (this.edithEd.id) {
      this.edId = this.edithEd.id;
      this.formEd.patchValue({
        name: this.edithEd.name,
        link: this.edithEd.link,
      });
      this.image = this.edithEd.img;
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
      img: this.image,
    };
    this.formEd.reset();
    if (this.edId == 0) {
      this.edId = this.edService.createEducation(ed);
    } else {
      ed.id = this.edId;
      this.edService.updateEducation(ed);
    }
  }
  finished() {}
}
