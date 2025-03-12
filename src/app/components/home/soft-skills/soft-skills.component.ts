import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/backend/service/auth.service';
import { SoftSkillService } from 'src/app/backend/service/soft-skill.service';
import { SoftSkill } from 'src/app/interface/softSkill';
import * as softsJson from '../../../../assets/json/Softs.json';
import {
  CRUDLocalService,
  DATA,
} from 'src/app/backend/service/CRUD-Local.service';
import { CommonModule } from '@angular/common';
import { FormSoftSkillComponent } from './form-soft-skill/form-soft-skill.component';

const { softs } = DATA;
@Component({
    selector: 'app-soft-skills',
    imports: [CommonModule, FormSoftSkillComponent],
    templateUrl: './soft-skills.component.html',
    styleUrls: ['./soft-skills.component.css']
})
export class SoftSkillsComponent implements OnInit {
  edithMode: boolean = false;
  toEdith: boolean = false;
  sSs: SoftSkill[];
  edithSS: SoftSkill = {} as SoftSkill;

  constructor(
    private local: CRUDLocalService,
    private auth: AuthService,
    private ssService: SoftSkillService
  ) {
    this.sSs = this.local.get<SoftSkill[]>(softs) ?? softsJson;
  }

  ngOnInit(): void {
    this.ssService.subscribeSs().subscribe({
      next: (res) => (this.sSs = res),
    });
    this.auth.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  delete(e: SoftSkill) {
    this.ssService.deleteSoftSkill(e);
  }
  edith(ss?: SoftSkill) {
    if (ss) {
      this.edithSS = ss;
    }
    this.toEdith = !this.toEdith;
  }
}
