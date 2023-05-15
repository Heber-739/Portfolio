import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HardSkill } from 'src/app/interface/hardSkill';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CRUDLocalService } from './CRUD-Local.service';

const GET_ALL = 'AllHardSkillDB';
const KEY = 'userHardSkill';

@Injectable({
  providedIn: 'root',
})
export class HardSkillService {
  URL: string = `${environment.URL}/hardSkill`;
  private hSkills$: Subject<HardSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService,
    private local: CRUDLocalService
  ) {}

  public subscribeHSs() {
    return this.hSkills$.asObservable();
  }
  public changeObservable(hssGet?: HardSkill[]) {
    let hss = hssGet ? hssGet : this.local.get<HardSkill>(KEY);
    this.hSkills$.next(hss);
  }

  /* -------------CRUD´s Methods------------- */
  public getAllHardSkill(): HardSkill[] {
    let ret: HardSkill[] = [];
    this.http.get<HardSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.setAll<HardSkill>(res, GET_ALL);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
    return ret;
  }

  public getHardSkill() {
    let userId = this.token.getUsername();
    this.http.get<HardSkill[]>(this.URL + `/list/${userId}`).subscribe({
      next: (res) => {
        this.local.set<HardSkill>(res, KEY);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
  public addHSToUser(hs: HardSkill, userId: string) {
    this.http.get<Message>(this.URL + `/add/${hs.id}/${userId}`).subscribe({
      next: (res) => {
        this.local.add<HardSkill>(hs, KEY);
        this.popup.showMessage(res.message);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N°${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
  public removeHSToUser(hs: HardSkill) {
    let userId: string = this.token.getUsername();
    this.http.get<Message>(this.URL + `/remove/${hs.id}/${userId}`).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.remove<HardSkill>(hs, KEY);
      },
      error: (err) => console.log(err),
      complete: () => this.changeObservable(),
    });
  }
  public createHardSkill(hs: HardSkill) {
    let username = this.token.getUsername();
    console.log(hs, username);
    this.http.post<any>(this.URL + `/create/${username}`, hs).subscribe({
      next: (res) => {
        /* this.local.add<HardSkill>(res, KEY); */
        console.log(res);
      },
      error: (err) => console.log(err),
      /*         this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
       */ complete: () => {
        this.changeObservable();
        this.popup.showMessage('Hard Skill creado');
      },
    });
  }
  public deleteHardSkill(hs: HardSkill) {
    let userId = this.token.getUsername();
    this.http
      .delete<Message>(this.URL + `/delete/${hs.id}/${userId}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove(hs, KEY);
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
        this.local.update<HardSkill>(hs, KEY);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
}
