import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Message } from 'src/app/interface/Message';
import { SoftSkill } from 'src/app/interface/softSkill';
import { ModalService } from 'src/app/service/modal.service';
import { environment } from 'src/environments/environment';
import { TokenService } from './token.service';
import { CRUDLocalService } from './CRUD-Local.service';

const GET_ALL = 'AllSoftSkillDB';
const KEY = 'userSoftSkill';

@Injectable({
  providedIn: 'root',
})
export class SoftSkillService {
  URL: string = `${environment.URL}/softSkill`;
  private sSkills$: Subject<SoftSkill[]> = new Subject();

  constructor(
    private popup: ModalService,
    private http: HttpClient,
    private token: TokenService,
    private local: CRUDLocalService
  ) {}

  public subscribeSs() {
    return this.sSkills$.asObservable();
  }
  public changeObservableSs(sSsGet?: SoftSkill[]) {
    let sss: SoftSkill[] = sSsGet ? sSsGet : this.local.get<SoftSkill>(KEY);
    this.sSkills$.next(sss);
  }

  /* -------------CRUD´s Methods------------- */
  public getAllSoftSkill(): SoftSkill[] {
    let ret: SoftSkill[] = [];
    this.http.get<SoftSkill[]>(this.URL + '/listAll').subscribe({
      next: (res) => {
        this.local.setAll<SoftSkill>(res, GET_ALL);
        ret = res;
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () =>
        this.popup.showMessage(
          'Ya puede ver la lista completa de Skills existentes en la Base de Datos.'
        ),
    });
    return ret;
  }

  public getSoftSkill() {
    let username = this.token.getUsername();
    this.http.get<SoftSkill[]>(this.URL + `/list/${username}`).subscribe({
      next: (res) => this.local.set<SoftSkill>(res, KEY),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservableSs(),
    });
  }
  public addSSToUser(ss: SoftSkill, userId: string) {
    this.http.get<Message>(this.URL + `/add/${ss.id}/${userId}`).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.add<SoftSkill>(ss, KEY);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        this.changeObservableSs();
      },
    });
  }
  public removeSSToUser(ss: SoftSkill, userId: string) {
    this.http.get<Message>(this.URL + `/remove/${ss.id}/${userId}`).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.remove<SoftSkill>(ss, KEY);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservableSs(),
    });
  }
  public createSoftSkill(ss: SoftSkill) {
    let username = this.token.getUsername();
    this.http.post<SoftSkill>(this.URL + `/create/${username}`, ss).subscribe({
      next: (res) => this.local.add<SoftSkill>(res, KEY),
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => {
        {
          this.changeObservableSs();
          this.popup.showMessage('Soft Skill creado');
        }
      },
    });
  }
  public deleteSoftSkill(ss: SoftSkill) {
    let username = this.token.getUsername();
    this.http
      .get<Message>(this.URL + `/remove/${ss.id}/${username}`)
      .subscribe({
        next: (res) => {
          this.popup.showMessage(res.message);
          this.local.remove<SoftSkill>(ss, KEY);
        },
        error: (err) =>
          this.popup.showMessage(
            `${err.error.message}\nError N° ${err.status}`
          ),
        complete: () => this.changeObservableSs(),
      });
  }
  public updateSoftSkill(ss: SoftSkill) {
    this.http.put<Message>(this.URL + `/update/${ss.id}`, ss).subscribe({
      next: (res) => {
        this.popup.showMessage(res.message);
        this.local.update<SoftSkill>(ss, KEY);
      },
      error: (err) =>
        this.popup.showMessage(`${err.error.message}\nError N° ${err.status}`),
      complete: () => this.changeObservableSs(),
    });
  }
}
