import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { EducationService } from 'src/app/backend/service/education.service';
import { Education } from 'src/app/interface/education';

@Component({
  selector: 'app-form-education',
  templateUrl: './form-education.component.html',
  styleUrls: ['./form-education.component.css'],
})
export class FormEducationComponent implements OnInit {
  @Output() finish: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Input() edithEd!: Education;
  edId: number = 0;
  edFinish: boolean = false;
  myimage: any;
  type_img: any;
  formEd = new FormGroup({
    name: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
  });

  constructor(private edService: EducationService) {}

  ngOnInit(): void {
    if (this.edithEd.id) {
      this.edId = this.edithEd.id;
      this.formEd.patchValue({
        name: this.edithEd.name,
        link: this.edithEd.link,
      });
      this.myimage = this.edithEd.img;
      this.type_img = this.edithEd.type_img;
      this.edFinish = this.edithEd.finish;
    }
  }

  onchange(e: Event) {
    const target = e.currentTarget as HTMLInputElement;
    let image = target.files?.[0]!;
    this.type_img = image.type;
    this.myimage = this.getBase64(image);
  }
  getBase64(file: File) {
    let reader = new FileReader();
    reader.onload = () => {
      this.myimage = reader.result;
    };
    reader.readAsDataURL(file);
  }
  saveEducation() {
    let ed: Education = {
      name: this.formEd.get('name')?.value,
      link: this.formEd.get('link')?.value,
      finish: this.edFinish,
      img: this.myimage,
      type_img: this.type_img,
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
