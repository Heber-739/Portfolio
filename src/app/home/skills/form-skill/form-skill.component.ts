import { Component, Input, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxImageCompressService } from 'ngx-image-compress';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { Image } from 'src/app/interface/Image';
import { HardSkill } from 'src/app/interface/hardSkill';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.css'],
})
export class FormSkillComponent implements OnInit {
  @Input() edithHS: HardSkill = {} as HardSkill;
  image!: Image;
  formHS = new FormGroup({
    name: new FormControl('', [Validators.required]),
    percentage: new FormControl('', [Validators.required, Validators.max(100)]),
  });
  constructor(
    private compress: NgxImageCompressService,
    private hsService: HardSkillService,
    private imgCompress: ImageCompressService
  ) {}

  ngOnInit(): void {
    if (this.edithHS.id) {
      this.formHS.patchValue({
        name: this.edithHS.name,
        percentage: this.edithHS.percentage,
      });
      this.image = this.edithHS.img;
    }
  }

  loadImage() {
    this.imgCompress.compress().then((res) => (this.image = res));
  }
  saveHardSkill() {
    let hs: HardSkill = {
      name: this.formHS.get('name')?.value,
      percentage: this.formHS.get('percentage')?.value,
      img: this.image,
    };
    if (this.edithHS.id == 0) {
      this.hsService.createHardSkill(hs);
    } else if (this.edithHS.id != 0) {
      this.hsService.updateHardSkill(this.edithHS.id!, hs);
    }
    this.image = {} as Image;
    this.formHS.reset();
    this.edithHS = {} as HardSkill;
  }
}
