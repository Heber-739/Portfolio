import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { EducationService } from 'src/app/backend/service/education.service';
import { Image } from 'src/app/interface/Image';
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
  image!: Image;
  formEd = new FormGroup({
    name: new FormControl('', [Validators.required]),
    link: new FormControl('', [Validators.required]),
  });

  constructor(
    private compress: NgxImageCompressService,
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
    this.compress.uploadFile().then(({ image, orientation, fileName }) => {
      console.log(this.compress.byteCount(image));
      this.compress
        .compressFile(image, orientation, 50, 50)
        .then((compressedImage) => {
          const getType = (t: string) => t.slice(5, t.indexOf(';'));
          fetch(compressedImage)
            .then((res) => res.blob())
            .then((blob) => {
              const reader = new FileReader();
              reader.readAsDataURL(blob);
              reader.onload = () => {
                this.image = new Image(reader.result, fileName, getType(image));
              };
            });
        });
    });
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
