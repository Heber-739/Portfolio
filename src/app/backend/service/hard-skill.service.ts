import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { HardSkill } from 'src/app/interface/hardSkill';
import { Message } from 'src/app/interface/Message';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';

const ALL_DB_HS = 'AllHardSkillDB';
const LOCAL_HS = 'userHardSkill';

@Injectable({
  providedIn: 'root',
})
export class HardSkillService {
  URL: string = `${environment.URL}/hardSkill`;
  private hSkills$: Subject<HardSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService
  ) {}

  public subscribeHSs() {
    return this.hSkills$.asObservable();
  }
  public changeObservable(hssGet: HardSkill[]) {
    let hss = hssGet ? hssGet : this.getLocalHardSkill();
    this.hSkills$.next(hss);
  }

  /* -------------LocalStorage´s Methods------------- */
  public getAllDBHardSkill(): HardSkill[] {
    return JSON.parse(window.sessionStorage.getItem(ALL_DB_HS) || '[]');
  }
  public setAllDBHardSkill(hSs: HardSkill[]) {
    window.sessionStorage.setItem(ALL_DB_HS, JSON.stringify(hSs));
  }
  public getLocalHardSkill(): HardSkill[] {
    return JSON.parse(window.sessionStorage.getItem(LOCAL_HS) || '[]');
  }
  public addLocalHardSkill(ed: HardSkill) {
    let hss: HardSkill[] = this.getLocalHardSkill();
    hss.push(ed);
    this.setLocalHardSkill(hss);
  }
  public removeLocalHardSkill(id: number) {
    let hss = this.getLocalHardSkill().filter((el) => el.id != id);
    this.setLocalHardSkill(hss);
  }

  public setLocalHardSkill(hSs: HardSkill[]) {
    window.sessionStorage.setItem(LOCAL_HS, JSON.stringify(hSs));
  }

  /* -------------CRUD´s Methods------------- */
  public getAllHardSkill() {
    this.http.get<HardSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => this.setAllDBHardSkill(res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () =>
        this.popup.showMessage(
          'Ya puede ver la lista completa de Skills existentes en la Base de Datos.'
        ),
    });
  }

  public getHardSkill() {
    let userId = '/' + this.token.getUsername();
    this.http.get<HardSkill[]>(this.URL + `/list${userId}`).subscribe({
      next: (res) => {
        this.setLocalHardSkill(res);
        this.changeObservable(res);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
    });
  }
  public addHSToUser(hsId: number, userId: string) {
    this.http.get<HardSkill>(this.URL + `/add/${hsId}/${userId}`).subscribe({
      next: (res) => this.addLocalHardSkill(res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N°${err.status}`),
      complete: () => {
        this.popup.showMessage('Hard Skill agregado.');
        this.changeObservable();
      },
    });
  }
  public removeHSToUser(hsId: number, userId: string) {
    this.http.get<Message>(this.URL + `/remove/${hsId}/${userId}`).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.removeLocalHardSkill(hsId);
      },
      error: (err) => console.log(err),
      complete: () => this.changeObservable(),
    });
  }
  public createHardSkill(hs: HardSkill) {
    let username = this.token.getUsername();
    this.http.post<HardSkill>(this.URL + `/create/${username}`, hs).subscribe({
      next: (res) => this.addLocalHardSkill(res),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.changeObservable();
        this.popup.showMessage('Hard Skill creado');
      },
    });
  }
  public deleteHardSkill(id: number) {
    let userId = this.token.getUsername();
    this.http.delete<Message>(this.URL + `/delete/${id}/${userId}`).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.removeLocalHardSkill(id);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nErro N° ${err.status}`),
      complete: () => this.changeObservable(),
    });
  }
  public updateHardSkill(id: number, hs: HardSkill) {
    this.http.put<Message>(this.URL + `/update/${id}`, hs).subscribe({
      next: (res) => this.popup.showMessage(res.message),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.getHardSkill(),
    });
  }
}
