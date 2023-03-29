import { Component, OnInit } from '@angular/core';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { HardSkill } from 'src/app/interface/hardSkill';

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
    private token: TokenService,
    private hsService: HardSkillService
  ) {}

  ngOnInit(): void {
    this.hsService.subscribeHSs().subscribe({
      next: (res) => (this.skills = res),
    });
    this.token.edithObservable().subscribe({
      next: (res) => (this.edithMode = res),
    });
  }

  addSkill() {
    this.toEdith = !this.toEdith;
  }
  delete(i: HardSkill) {
    this.hsService.removeHSToUser(i);
  }
  edith(i: HardSkill) {
    this.edithHS = i;
    this.toEdith = true;
  }
  finish() {
    this.toEdith = false;
  }
}
