import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { UntypedFormGroup, UntypedFormControl, Validators } from '@angular/forms';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { HardSkill } from 'src/app/Interface/hardSkill';
import { Tag } from 'src/app/Interface/tag';
import { ImageCompressService } from 'src/app/service/image-compress.service';

@Component({
  selector: 'app-form-skill',
  templateUrl: './form-skill.component.html',
  styleUrls: ['./form-skill.component.css'],
})
export class FormSkillComponent implements OnInit {
  @Input() edithHS: HardSkill = {} as HardSkill;
  @Output() cancel = new EventEmitter<boolean>();
  image!: string;
  formHS = new UntypedFormGroup({
    name: new UntypedFormControl('', [Validators.required]),
    percentage: new UntypedFormControl('', [Validators.required, Validators.max(100)]),
  });
  constructor(
    private hsService: HardSkillService,
    private imgCompress: ImageCompressService
  ) {}

  ngOnInit(): void {
    if (this.edithHS.id) {
      this.formHS.patchValue({
        name: this.edithHS.tag.name,
        percentage: this.edithHS.percentage,
      });
      this.image = this.edithHS.tag.image;
    }
  }

  loadImage() {
    this.imgCompress.compress().then((res) => (this.image = res));
  }
  saveHardSkill() {
    let tg = new Tag(this.formHS.get('name')?.value, this.image);
    let hs: HardSkill = new HardSkill(this.formHS.get('percentage')?.value, tg);
    if (!this.edithHS.id) {
      this.hsService.createHardSkill(hs);
    } else if (this.edithHS.id) {
      this.hsService.updateHardSkill(this.edithHS.id!, hs);
    }
    this.reset();
  }
  reset() {
    this.image = '';
    this.formHS.reset();
    this.edithHS = {} as HardSkill;
  }
  abort() {
    this.cancel.emit(false);
    this.reset();
  }
}
