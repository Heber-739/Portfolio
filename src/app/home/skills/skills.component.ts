import { AfterContentInit, Component, OnDestroy, OnInit } from '@angular/core';
import { Subject, takeUntil } from 'rxjs';
import { HardSkillService } from 'src/app/backend/service/hard-skill.service';
import { TokenService } from 'src/app/backend/service/token.service';
import { HardSkill } from 'src/app/interface/hardSkill';

@Component({
  selector: 'app-skills',
  templateUrl: './skills.component.html',
  styleUrls: ['./skills.component.css'],
})
export class SkillsComponent implements OnInit, AfterContentInit, OnDestroy {
  edithMode: boolean = false;
  edithHS: HardSkill = {} as HardSkill;
  toEdith: boolean = false;
  skills: HardSkill[] = [];
  unsuscribe: Subject<boolean> = new Subject();
  constructor(
    private token: TokenService,
    private hsService: HardSkillService
  ) {}

  ngOnInit(): void {
    this.hsService
      .subscribeHSs()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.skills = res),
      });
    this.token
      .edithObservable()
      .pipe(takeUntil(this.unsuscribe))
      .subscribe({
        next: (res) => (this.edithMode = res),
      });
    console.log(this.skills);
  }
  ngAfterContentInit(): void {
    this.hsService.getHardSkill();
    console.log('1');
  }
  ngOnDestroy(): void {
    this.unsuscribe.next(true);
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
