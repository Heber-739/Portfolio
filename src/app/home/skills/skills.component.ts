import { Component, OnInit } from '@angular/core';
import { CRUDLocalService } from 'src/app/backend/service/CRUD-Local.service';
import { AuthService } from 'src/app/backend/service/auth.service';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { HardSkill } from 'src/app/interface/hardSkill';
import { DATA } from '../../backend/service/CRUD-Local.service';

const { skills } = DATA;
@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit {
  edithMode: boolean = false;
  edithHS: HardSkill = {} as HardSkill;
  toEdith: boolean = false;
  skills: HardSkill[] = [];

  constructor(
    private authS: AuthService,
    private local: CRUDLocalService,
    private hsService: HardSkillService
  ) {
    this.skills = this.local.get(skills) ?? this.hsService.getHardSkill();
  }

  ngOnInit(): void {
    this.hsService.subscribeHSs().subscribe({
      next: (res) => (this.skills = res),
    });
    this.authS.edith$().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  delete(i: HardSkill) {
    this.hsService.removeHSToUser(i);
  }
  edith(i?: HardSkill) {
    if (i) {
      this.edithHS = i;
    }
    this.toEdith = true;
  }
  finish() {
    this.toEdith = false;
  }
}
