import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { SoftSkillService } from 'src/app/backend/service/soft-skill.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { SoftSkill } from 'src/app/interface/softSkill';

@Component({
  selector: 'app-soft-skills',
  templateUrl: './soft-skills.component.html',
  styleUrls: ['./soft-skills.component.css'],
})
export class SoftSkillsComponent implements OnInit, OnDestroy {
  edithMode: boolean = false;
  toEdith: boolean = false;
  sSs: SoftSkill[] = [];
  edithSS: SoftSkill = {} as SoftSkill;
  unsuscribe: Subject<boolean> = new Subject();

  constructor(
    private token: TokenService,
    private ssService: SoftSkillService
  ) {}

  ngOnInit(): void {
    this.ssService
      .subscribeSs()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.sSs = res),
      });
    this.token
      .edithObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.edithMode = res),
      });
  }
  ngOnDestroy(): void {
    this.unsuscribe.next(true);
  }
  addSoftSkill() {
    this.toEdith = !this.toEdith;
  }
  delete(e: SoftSkill) {
    this.ssService.deleteSoftSkill(e);
  }
  edith(ss: SoftSkill) {
    this.addSoftSkill();
    this.edithSS = ss;
  }
}
