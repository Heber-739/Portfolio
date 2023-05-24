import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HardSkill } from 'src/app/interface/hardSkill';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { CRUDLocalService } from './CRUD-Local.service';
import { DATA } from '../../backend/service/CRUD-Local.service';

const { username, skills, allSkills } = DATA;

@Injectable({
  providedIn: 'root',
})
export class HardSkillService {
  URL: string = `${environment.URL}/hardSkill`;
  private hSkills$: Subject<HardSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private local: CRUDLocalService
  ) {}

  public subscribeHSs() {
    return this.hSkills$.asObservable();
  }
  public changeObservable() {
    this.hSkills$.next(this.local.get<HardSkill[]>(skills));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllHardSkill(): HardSkill[] {
    let ret: HardSkill[] = [];
    this.http.get<HardSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.set<HardSkill[]>(res, allSkills);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }

  public getHardSkill(): HardSkill[] {
    let ret: HardSkill[] = [];
    this.http.get<HardSkill[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => {
        this.local.set<HardSkill[]>(res, skills);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }

  public addHSToUser(hs: HardSkill, userId: string) {
    this.http.get<Message>(this.URL + `/add/${hs.id}/${userId}`).subscribe({
      next: (res) => {
        this.local.add<HardSkill>(hs, skills);
        this.popup.showMessage(res.message);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N°${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
  public removeHSToUser(hs: HardSkill) {
    this.http
      .get<Message>(this.URL + `/remove/${hs.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove<HardSkill>(hs, skills);
        },
        error: (err) => console.log(err),
        complete: () => this.changeObservable(),
      });
  }
  public createHardSkill(hs: HardSkill) {
    this.http.post<HardSkill>(this.URL + `/create/${username}`, hs).subscribe({
      next: (res) => this.local.add<HardSkill>(res, skills),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.changeObservable();
        this.popup.showMessage('Hard Skill creado');
      },
    });
  }
  public deleteHardSkill(hs: HardSkill) {
    this.http
      .delete<Message>(this.URL + `/delete/${hs.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove(hs, skills);
        },
        error: (err) =>
          this.popup.showMessage(`${err.error.message}\nErro N° ${err.status}`),
        complete: () => this.changeObservable(),
      });
  }
  public updateHardSkill(id: number, hs: HardSkill) {
    this.http.put<Message>(this.URL + `/update/${id}`, hs).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.update<HardSkill>(hs, skills);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
}
